import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Accelerometer, Gyroscope } from "expo-sensors";
import SensorCard from "../components/SensorCard";
import { COLORS } from "../constants/Theme";

type Props = { onBack: () => void };

export default function SensorDataScreen({ onBack }: Props) {
  const [accel, setAccel] = useState({ x: 0, y: 0, z: 0 });
  const [gyro, setGyro]   = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    Accelerometer.setUpdateInterval(500);
    Gyroscope.setUpdateInterval(500);
    const a = Accelerometer.addListener(setAccel);
    const g = Gyroscope.addListener(setGyro);
    return () => { a.remove(); g.remove(); };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Datos en tiempo real</Text>
      <SensorCard title="Acelerómetro" unit="g" data={accel} />
      <SensorCard title="Giroscopio"   unit="rad/s" data={gyro} />
      <Pressable style={styles.button} onPress={onBack}>
        <Text style={styles.buttonText}>Volver</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, padding: 32 },
  title: {
    color: COLORS.textHigh, fontSize: 36, fontWeight: "bold",
    marginTop: 20, marginBottom: 16, textAlign: "center",
  },
  button: {
    backgroundColor: COLORS.primary, padding: 16,
    borderRadius: 14, marginTop: 20,
  },
  buttonText: {
    color: COLORS.btnText, fontWeight: "bold",
    textAlign: "center", fontSize: 18,
  },
});