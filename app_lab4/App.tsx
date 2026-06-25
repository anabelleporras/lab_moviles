// App.tsx
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { AuthProvider, useAuth } from "./src/hooks/use-auth";
import { useTheme } from "./src/hooks/use-theme";
import { LoginScreen } from "./src/screens/login";
import { RegisterScreen } from "./src/screens/register";
import { HomeScreen } from "./src/screens/home";

WebBrowser.maybeCompleteAuthSession();

function Root() {
  const { user, initializing } = useAuth();
  const theme = useTheme();
  const [screen, setScreen] = useState<"login" | "register">("login");

  // Mientras restauramos la sesión guardada (AsyncStorage), mostramos un splash.
  if (initializing) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.colors.background,
        }}
      >
        <ActivityIndicator color={theme.colors.accent} />
      </View>
    );
  }

  // Hay sesión -> perfil. (Funciona tanto para Google como para email/password.)
  if (user) {
    return <HomeScreen />;
  }

  // Sin sesión -> login o registro.
  return screen === "login" ? (
    <LoginScreen onNavigateToRegister={() => setScreen("register")} />
  ) : (
    <RegisterScreen onNavigateToLogin={() => setScreen("login")} />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}
