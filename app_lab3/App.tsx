import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import MazeGameScreen from "./src/screens/MazeGameScreen";

export default function App() {
  const [screen, setScreen] = useState<"home" | "game" | "sensors">("home");

  return (
    <SafeAreaView style={styles.container}>
      {screen === "home" && <HomeScreen onNavigate={setScreen} />}
      {screen === "game" && <MazeGameScreen onBack={() => setScreen("home")} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101820",
  },
});