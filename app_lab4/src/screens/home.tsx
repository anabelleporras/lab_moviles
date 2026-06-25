import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { useTheme } from "../hooks/use-theme";
import { useAuth } from "../hooks/use-auth";

function getInitials(name?: string, email?: string): string {
  const source = (name || email || "?").trim();
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return source.slice(0, 2).toUpperCase();
}

export function HomeScreen() {
  const { user, signOut } = useAuth();
  const { colors, spacing, typography, radius } = useTheme();

  if (!user) return null;

  const providerLabel = user.provider === "google" ? "Google" : "Email y contraseña";

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderRadius: radius.xl,
            padding: spacing.xl,
          },
        ]}
      >
        {user.picture ? (
          <Image source={{ uri: user.picture }} style={styles.avatar} />
        ) : (
          <View
            style={[
              styles.avatar,
              styles.avatarFallback,
              { backgroundColor: colors.accent },
            ]}
          >
            <Text style={[typography.title, { color: colors.onAccent }]}>
              {getInitials(user.name, user.email)}
            </Text>
          </View>
        )}

        <Text style={[typography.title, { color: colors.textPrimary }]}>
          {user.name ?? "Usuario"}
        </Text>

        <Text style={[typography.body, { color: colors.textSecondary }]}>
          {user.email}
        </Text>

        <View
          style={[
            styles.badge,
            {
              backgroundColor: colors.background,
              borderColor: colors.border,
              borderRadius: radius.pill,
              paddingVertical: spacing.xs,
              paddingHorizontal: spacing.md,
              marginTop: spacing.sm,
            },
          ]}
        >
          <Text style={[typography.caption, { color: colors.textSecondary }]}>
            Sesión con {providerLabel}
          </Text>
        </View>

        <Pressable
          onPress={signOut}
          style={[
            styles.button,
            {
              backgroundColor: colors.accent,
              borderRadius: radius.lg,
              padding: spacing.lg,
              marginTop: spacing.xl,
            },
          ]}
        >
          <Text style={[typography.heading, { color: colors.onAccent }]}>
            Cerrar sesión
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  card: {
    alignItems: "center",
    borderWidth: 1,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 16,
  },
  avatarFallback: {
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    borderWidth: 1,
  },
  button: {
    alignSelf: "stretch",
    alignItems: "center",
  },
});
