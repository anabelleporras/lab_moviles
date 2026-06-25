import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
  type Auth,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Los valores vienen de las variables de entorno (.env). El prefijo
// EXPO_PUBLIC_ es necesario para que Expo las inyecte en el bundle.
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Patrón singleton: evita re-inicializar la app con Fast Refresh.
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// initializeAuth() solo puede llamarse una vez por app. En desarrollo, el
// Fast Refresh puede ejecutar este archivo de nuevo, así que lo envolvemos
// en un try/catch y caemos a getAuth() si ya estaba inicializado.
let auth: Auth;
try {
  auth = initializeAuth(app, {
    // Persiste la sesión en AsyncStorage -> el usuario sigue logueado
    // aunque cierre y vuelva a abrir la app.
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch {
  auth = getAuth(app);
}

export { app, auth };
