import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../services/firebase";
import type { UserInfo } from "../constants/types";

// Clave bajo la que guardamos la sesión en AsyncStorage. Esta es nuestra
// persistencia "propia": Firebase ya persiste su token, pero aquí guardamos
// además el perfil mostrable (nombre/email/foto) y el método usado, de modo
// que Google y email/password se restauran igual al reabrir la app.
const SESSION_KEY = "@auth_session";

type AuthContextValue = {
  user: UserInfo | null;
  // true mientras leemos AsyncStorage al arrancar (para mostrar un splash).
  initializing: boolean;
  registerWithEmail: (name: string, email: string, password: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  setGoogleUser: (user: UserInfo) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [initializing, setInitializing] = useState(true);

  // Al montar: restauramos la sesión guardada (si existe).
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(SESSION_KEY);
        if (active && raw) setUser(JSON.parse(raw) as UserInfo);
      } catch {
        // Storage corrupto o vacío: arrancamos sin sesión.
      } finally {
        if (active) setInitializing(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // Guarda (o limpia) la sesión en estado + AsyncStorage de forma atómica.
  const persist = useCallback(async (next: UserInfo | null) => {
    setUser(next);
    if (next) await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(next));
    else await AsyncStorage.removeItem(SESSION_KEY);
  }, []);

  const registerWithEmail = useCallback(
    async (name: string, email: string, password: string) => {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name) await updateProfile(cred.user, { displayName: name });
      await persist({
        uid: cred.user.uid,
        name: name || cred.user.displayName || undefined,
        email: cred.user.email ?? undefined,
        picture: cred.user.photoURL ?? undefined,
        provider: "password",
      });
    },
    [persist]
  );

  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      await persist({
        uid: cred.user.uid,
        name: cred.user.displayName ?? undefined,
        email: cred.user.email ?? undefined,
        picture: cred.user.photoURL ?? undefined,
        provider: "password",
      });
    },
    [persist]
  );

  // Lo llama la pantalla de login tras obtener el perfil de Google (Parte A).
  const setGoogleUser = useCallback(
    async (googleUser: UserInfo) => {
      await persist({ ...googleUser, provider: "google" });
    },
    [persist]
  );

  const signOut = useCallback(async () => {
    try {
      // Solo cerramos sesión en Firebase si veníamos de email/password.
      if (user?.provider === "password") await firebaseSignOut(auth);
    } finally {
      await persist(null);
    }
  }, [user, persist]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      initializing,
      registerWithEmail,
      signInWithEmail,
      setGoogleUser,
      signOut,
    }),
    [user, initializing, registerWithEmail, signInWithEmail, setGoogleUser, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>.");
  return ctx;
}
