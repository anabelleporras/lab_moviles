import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import { Accelerometer, Gyroscope } from "expo-sensors";
import { COLORS } from "../constants/Theme";

type Props = {
  onBack: () => void;
};

const BALL_SIZE = 28;
const GOAL_SIZE = 42;

export default function MazeGameScreen({ onBack }: Props) {
  const { width } = Dimensions.get("window");
  const boardSize = Math.min(width - 32, 360);

  const [ball, setBall] = useState({ x: 20, y: 20 });
  const [message, setMessage] = useState("Mueve la bolita inclinando el celular");

  const goal = {
    x: boardSize - GOAL_SIZE - 16,
    y: boardSize - GOAL_SIZE - 16,
  };

  const resetGame = () => {
    setBall({ x: 20, y: 20 });
    setMessage("Mueve la bolita inclinando el celular.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Laberinto</Text>
      <Text style={styles.message}>{message}</Text>

      <View style={[styles.board, { width: boardSize, height: boardSize }]}>
        <View
          style={[
            styles.goal,
            {
              left: goal.x,
              top: goal.y,
            },
          ]}
        />

        <View
          style={[
            styles.ball,
            {
              left: ball.x,
              top: ball.y,
            },
          ]}
        />
      </View>

      <Text style={styles.sensorText}>
        Giroscopio Z: 0 rad/s
      </Text>

      <Pressable style={styles.button} onPress={resetGame}>
        <Text style={styles.buttonText}>Reiniciar</Text>
      </Pressable>

      <Pressable style={styles.backButton} onPress={onBack}>
        <Text style={styles.buttonText}>Volver</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    padding: 52,
    alignItems: "center",
  },
  title: {
    color: COLORS.textHigh,
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 20,
  },
  message: {
    color: COLORS.danger,
    marginVertical: 12,
    fontSize: 18,
  },
  board: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 18,
    position: "relative",
    overflow: "hidden",
    borderWidth: 4,
    borderColor: COLORS.primaryDim,
  },
  ball: {
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
    backgroundColor: COLORS.accent,
    position: "absolute",
  },
  goal: {
    width: GOAL_SIZE,
    height: GOAL_SIZE,
    borderRadius: 8,
    backgroundColor: COLORS.teal,
    position: "absolute",
  },
  sensorText: {
    color: COLORS.textMid,
    marginTop: 16,
  },
  button: {
    width: '100%',
    gap: 16,
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 14,
    marginTop: 20,
  },
  backButton: {
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