import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Accelerometer, Gyroscope } from "expo-sensors";
import SensorCard from "../components/SensorCard";
import { COLORS } from "../constants/Theme";

type Props = {
  onBack: () => void;
};

export default function SensorDataScreen({ onBack }: Props) {
  const [accelerometer, setAccelerometer] = useState({ x: 0, y: 0, z: 0 });
  const [gyroscope, setGyroscope] = useState({ x: 0, y: 0, z: 0 });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Datos en tiempo real</Text>

      <SensorCard
        title="Acelerómetro"
        unit="m/s² o g según plataforma"
        data={accelerometer}
      />

      <SensorCard
        title="Giroscopio"
        unit="rad/s"
        data={gyroscope}
      />

      <Pressable style={styles.button} onPress={onBack}>
        <Text style={styles.buttonText}>Volver</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    padding: 32,
    //alignItems: "center",
  },
  title: {
    color: COLORS.textHigh,
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 20,
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
  buttonText: {
    color: COLORS.btnText,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});