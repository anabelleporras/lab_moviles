import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { COLORS } from "../constants/Theme";

type Props = {
  onNavigate: (screen: "game" | "sensors") => void;
};

export default function HomeScreen({ onNavigate }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tilt Maze</Text>

      <Pressable style={styles.button} onPress={() => onNavigate("game")}>
        <Text style={styles.buttonText}>Jugar</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} /*onPress={() => onNavigate("sensors")}*/>
        <Text style={styles.buttonText}>Ver datos de sensores</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.textHigh,
    letterSpacing: 4,
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textMid,
    textAlign: 'center'
  },
  button: {
    width: '100%',
    gap: 16,
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 14,
    marginTop: 20,
  },
  secondaryButton: {
    width: '100%',
    gap: 16,
    backgroundColor: COLORS.primaryFaint,
    padding: 16,
    borderRadius: 14,
    marginTop: 12,
  },
  buttonText: {
    color: COLORS.btnText,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});