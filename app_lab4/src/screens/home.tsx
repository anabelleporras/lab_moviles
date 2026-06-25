import { View, Text, Image, Pressable, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "../hooks/use-theme";
import { useAuth } from "../hooks/use-auth";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMemo } from 'react';

function getInitials(name?: string, email?: string): string {
  const source = (name || email || "?").trim();
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return source.slice(0, 2).toUpperCase();
}

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { user, signOut } = useAuth();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        root: { flex: 1, backgroundColor: theme.colors.background },
        scroll: { flex: 1 },
        scrollContent: { paddingBottom: 120 },
        header: {
          paddingHorizontal: theme.spacing.xl,
          paddingBottom: theme.spacing.xl,
          gap: theme.spacing.md,
        },
        headerRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        headerTitle: {
          ...theme.typography.title,
          color: theme.colors.textPrimary,
          fontWeight: '700',
        },
        userCard: {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.lg,
          padding: theme.spacing.lg,
          gap: theme.spacing.xs,
        },
        avatarRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing.md,
        },
        avatar: {
          width: 64,
          height: 64,
          borderRadius: theme.radius.pill,
        },
        avatarPlaceholder: {
          width: 64,
          height: 64,
          borderRadius: theme.radius.pill,
          backgroundColor: theme.colors.background,
          alignItems: 'center',
          justifyContent: 'center',
        },
        avatarText: {
          ...theme.typography.caption,
          color: theme.colors.textPrimary,
          fontWeight: '700',
        },
        userInfo: {
          flex: 1,
        },
        userName: {
          ...theme.typography.title,
          color: theme.colors.textPrimary,
          fontWeight: '700',
        },
        userEmail: {
          ...theme.typography.body,
          color: theme.colors.textSecondary,
        },
        userProvider: {
          ...theme.typography.body,
          color: theme.colors.textPrimary,
          opacity: 0.6,
          textTransform: 'capitalize',
        },
        logoutBtn: {
          marginHorizontal: theme.spacing.xl,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: theme.spacing.sm,
          paddingVertical: theme.spacing.md,
          borderRadius: theme.radius.pill,
          backgroundColor: theme.colors.accent,
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        logoutText: {
          ...theme.typography.body,
          color: theme.colors.textTertiary,
          fontWeight: '600',
        },
        center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
      }),
      [theme],
  );

  if (!user) return null;
  
  return (
    <View style={[styles.root, { paddingTop: insets.top + theme.spacing.sm }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Perfil</Text>
          </View>

          <View style={styles.userCard}>
            <View style={styles.avatarRow}>
              {user?.picture ? (
                <Image source={{ uri: user.picture }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarText}>
                    {getInitials(user.name, user.email)}
                  </Text>
                </View>
              )}
              <View style={styles.userInfo}>
                <Text style={styles.userName}>
                  {user?.name ?? 'Traveller'}
                </Text>
                {user?.email ? (
                  <Text style={styles.userEmail}>{user.email}</Text>
                ) : null}
                <Text style={styles.userProvider}>
                  Sesión con {user?.provider ?? ''}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Pressable
          style={[styles.logoutBtn, { marginTop: theme.spacing.xl }]}
          onPress={signOut}
        >
          <Text style={styles.logoutText}>
            Cerrar sesión
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
