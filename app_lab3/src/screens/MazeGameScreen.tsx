import React, { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import { Accelerometer, Gyroscope } from "expo-sensors";
import { COLORS } from "../constants/Theme";

type Props = { onBack: () => void };

const BALL_SIZE = 26;
const GOAL_SIZE = 32;
const SPEED     = 2.5;
const START     = { x: 20, y: 20 };

export default function MazeGameScreen({ onBack }: Props) {
  const { width } = Dimensions.get("window");
  const boardSize = Math.min(width - 32, 360);
  const goal      = { x: boardSize - GOAL_SIZE - 16, y: boardSize - GOAL_SIZE - 16 };

  // Refs para evitar stale closures dentro del listener
  const posRef = useRef(START);
  const wonRef = useRef(false);

  const [ball,   setBall]   = useState(START);
  const [gyroZ,  setGyroZ]  = useState(0);
  const [won,    setWon]    = useState(false);

  const reset = () => {
    posRef.current = { ...START };
    wonRef.current = false;
    setBall({ ...START });
    setWon(false);
  };

  useEffect(() => {
    Accelerometer.setUpdateInterval(16); // ~60 fps
    Gyroscope.setUpdateInterval(100);

    const accelSub = Accelerometer.addListener(({ x, y }) => {
      if (wonRef.current) return;

      const next = {
        x: Math.max(0, Math.min(boardSize - BALL_SIZE, posRef.current.x + x * SPEED)),
        y: Math.max(0, Math.min(boardSize - BALL_SIZE, posRef.current.y - y * SPEED)),
      };
      posRef.current = next;
      setBall({ ...next });

      // Detección de llegada a la meta
      if (
        Math.abs(next.x - goal.x) < GOAL_SIZE &&
        Math.abs(next.y - goal.y) < GOAL_SIZE
      ) {
        wonRef.current = true;
        setWon(true);
      }
    });

    const gyroSub = Gyroscope.addListener(({ z }) => setGyroZ(z));

    return () => { accelSub.remove(); gyroSub.remove(); };
  }, [boardSize]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Laberinto</Text>

      <Text style={[styles.message, won && styles.messageWon]}>
        {won
          ? "¡Llegaste a la meta!"
          : "Inclina el celular para mover la bolita"}
      </Text>

      <View style={[styles.board, { width: boardSize, height: boardSize }]}>
        {/* Meta */}
        <View style={[styles.goal, { left: goal.x, top: goal.y }]} />
        {/* Bola */}
        <View style={[styles.ball, { left: ball.x, top: ball.y }]} />
      </View>

      <Text style={styles.sensorText}>Giroscopio Z: {gyroZ.toFixed(3)} rad/s</Text>

      <Pressable style={styles.button} onPress={reset}>
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
    flex: 1, backgroundColor: COLORS.bg,
    padding: 52, alignItems: "center",
  },
  title: {
    color: COLORS.textHigh, fontSize: 36,
    fontWeight: "bold", marginTop: 20,
  },
  message: {
    color: COLORS.danger, marginVertical: 12,
    fontSize: 16, textAlign: "center",
  },
  messageWon: {
    color: COLORS.tealLight, fontSize: 20, fontWeight: "bold",
  },
  board: {
    backgroundColor: COLORS.bgCard, borderRadius: 18,
    position: "relative", overflow: "hidden",
    borderWidth: 4, borderColor: COLORS.primaryDim,
  },
  ball: {
    width: BALL_SIZE, height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
    backgroundColor: COLORS.accent, position: "absolute",
  },
  goal: {
    width: GOAL_SIZE, height: GOAL_SIZE,
    borderRadius: 8, backgroundColor: COLORS.teal, position: "absolute",
  },
  sensorText: { color: COLORS.textMid, marginTop: 16 },
  button: {
    width: "100%", backgroundColor: COLORS.primary,
    padding: 16, borderRadius: 14, marginTop: 20,
  },
  backButton: {
    width: "100%", backgroundColor: COLORS.primaryFaint,
    padding: 16, borderRadius: 14, marginTop: 12,
  },
  buttonText: {
    color: COLORS.btnText, fontWeight: "bold",
    textAlign: "center", fontSize: 18,
  },
});