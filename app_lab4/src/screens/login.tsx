import { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { useTheme } from "../hooks/use-theme";
import { useAuth } from "../hooks/use-auth";
import { GoogleLogo } from "../components/google-logo";
import { TextField } from "../components/text-field";
import { validateEmail, validatePassword } from "../utils/validators";
import { getAuthErrorMessage } from "../utils/firebase-errors";

type Props = {
  onNavigateToRegister: () => void;
};

export function LoginScreen({ onNavigateToRegister }: Props) {
  const { colors, spacing, typography, radius } = useTheme();
  const { signInWithEmail, setGoogleUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string | null; password?: string | null }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ---- Parte A: Google Sign-In (sin cambios funcionales) ----
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB,
  });

  useEffect(() => {
    async function getUserInfo(accessToken: string) {
      try {
        const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const profile = await res.json();
        await setGoogleUser({
          name: profile.name,
          email: profile.email,
          picture: profile.picture,
        });
      } catch {
        setFormError("No se pudo obtener la información de Google.");
      }
    }

    if (response?.type === "success") {
      const accessToken = response.authentication?.accessToken;
      if (accessToken) getUserInfo(accessToken);
    }
  }, [response, setGoogleUser]);

  // ---- Parte B: inicio de sesión con email/contraseña ----
  async function handleSignIn() {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    setErrors({ email: emailError, password: passwordError });
    setFormError(null);
    if (emailError || passwordError) return;

    try {
      setLoading(true);
      await signInWithEmail(email.trim(), password);
      // Si tiene éxito, useAuth actualiza el usuario y App muestra Home.
    } catch (e) {
      setFormError(getAuthErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={{ gap: spacing.lg }}>
        <View style={{ gap: spacing.xs }}>
          <Text style={[typography.display, { color: colors.textPrimary }]}>
            Bienvenido
          </Text>
          <Text style={[typography.body, { color: colors.textSecondary }]}>
            Inicia sesión para continuar.
          </Text>
        </View>

        <TextField
          label="Correo"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          placeholder="tucorreo@ejemplo.com"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          autoComplete="email"
          textContentType="emailAddress"
        />

        <TextField
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          placeholder="••••••••"
          secureTextEntry
          autoCapitalize="none"
          autoComplete="password"
          textContentType="password"
        />

        {formError ? (
          <Text style={[typography.caption, { color: colors.danger }]}>
            {formError}
          </Text>
        ) : null}

        <Pressable
          disabled={loading}
          onPress={handleSignIn}
          style={[
            styles.button,
            {
              backgroundColor: colors.accent,
              borderRadius: radius.lg,
              padding: spacing.lg,
              opacity: loading ? 0.7 : 1,
            },
          ]}
        >
          {loading ? (
            <ActivityIndicator color={colors.onAccent} />
          ) : (
            <Text style={[typography.heading, { color: colors.onAccent }]}>
              Iniciar sesión
            </Text>
          )}
        </Pressable>

        {/* Separador */}
        <View style={styles.dividerRow}>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <Text style={[typography.caption, { color: colors.textTertiary }]}>o</Text>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
        </View>

        {/* Parte A: Google */}
        <Pressable
          disabled={!request}
          onPress={() => promptAsync()}
          style={[
            styles.googleButton,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: radius.lg,
              padding: spacing.lg,
              gap: spacing.sm,
              opacity: request ? 1 : 0.6,
            },
          ]}
        >
          <GoogleLogo size={20} />
          <Text style={[typography.heading, { color: colors.textPrimary }]}>
            Continuar con Google
          </Text>
        </Pressable>

        <Pressable onPress={onNavigateToRegister} style={styles.linkRow}>
          <Text style={[typography.body, { color: colors.textSecondary }]}>
            ¿No tienes cuenta?{" "}
          </Text>
          <Text style={[typography.body, { color: colors.textPrimary, fontWeight: "600" }]}>
            Regístrate
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  button: {
    alignItems: "center",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  divider: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },
  linkRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
