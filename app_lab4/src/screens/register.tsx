import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useTheme } from "../hooks/use-theme";
import { useAuth } from "../hooks/use-auth";
import { TextField } from "../components/text-field";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirm,
} from "../utils/validators";
import { getAuthErrorMessage } from "../utils/firebase-errors";

type Props = {
  onNavigateToLogin: () => void;
};

type FieldErrors = {
  name?: string | null;
  email?: string | null;
  password?: string | null;
  confirm?: string | null;
};

export function RegisterScreen({ onNavigateToLogin }: Props) {
  const { colors, spacing, typography, radius } = useTheme();
  const { registerWithEmail } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    const nextErrors: FieldErrors = {
      name: validateName(name),
      email: validateEmail(email),
      password: validatePassword(password),
      confirm: validateConfirm(password, confirm),
    };
    setErrors(nextErrors);
    setFormError(null);

    const hasError = Object.values(nextErrors).some(Boolean);
    if (hasError) return;

    try {
      setLoading(true);
      await registerWithEmail(name.trim(), email.trim(), password);
      // Al crear la cuenta, useAuth deja al usuario logueado -> App muestra Home.
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
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ gap: spacing.lg }}>
          <View style={{ gap: spacing.xs }}>
            <Text style={[typography.display, { color: colors.textPrimary }]}>
              Crear cuenta
            </Text>
            <Text style={[typography.body, { color: colors.textSecondary }]}>
              Regístrate con tu correo y contraseña.
            </Text>
          </View>

          <TextField
            label="Nombre"
            value={name}
            onChangeText={setName}
            error={errors.name}
            placeholder="Tu nombre"
            autoCapitalize="words"
            autoComplete="name"
            textContentType="name"
          />

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
            placeholder="Mínimo 6 caracteres"
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password-new"
            textContentType="newPassword"
          />

          <TextField
            label="Confirmar contraseña"
            value={confirm}
            onChangeText={setConfirm}
            error={errors.confirm}
            placeholder="Repite tu contraseña"
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password-new"
            textContentType="newPassword"
          />

          {formError ? (
            <Text style={[typography.caption, { color: colors.danger }]}>
              {formError}
            </Text>
          ) : null}

          <Pressable
            disabled={loading}
            onPress={handleRegister}
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
                Crear cuenta
              </Text>
            )}
          </Pressable>

          <Pressable onPress={onNavigateToLogin} style={styles.linkRow}>
            <Text style={[typography.body, { color: colors.textSecondary }]}>
              ¿Ya tienes cuenta?{" "}
            </Text>
            <Text style={[typography.body, { color: colors.textPrimary, fontWeight: "600" }]}>
              Inicia sesión
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  button: {
    alignItems: "center",
  },
  linkRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
