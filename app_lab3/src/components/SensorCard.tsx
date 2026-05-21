import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/Theme";

type SensorData = {
  x: number;
  y: number;
  z: number;
};

type Props = {
  title: string;
  unit: string;
  data: SensorData;
};

export default function SensorCard({ title, unit, data }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.unit}>Unidad: {unit}</Text>

      <Text style={styles.value}>X: {data.x.toFixed(3)}</Text>
      <Text style={styles.value}>Y: {data.y.toFixed(3)}</Text>
      <Text style={styles.value}>Z: {data.z.toFixed(3)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 0.5,
    borderColor: COLORS.primaryDim,
  },
  title: {
    color: COLORS.btnText,
    fontSize: 20,
    fontWeight: "bold",
  },
  unit: {
    color: COLORS.textMid,
    marginVertical: 8,
  },
  value: {
    color: COLORS.btnText,
    fontSize: 16,
    marginTop: 4,
  },
});