// mobile/screens/Specialist.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Specialist() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Підбір спеціаліста</Text>
      <Text style={styles.text}>
        Тут буде форма або список для підбору психолога.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#6C63FF",
    marginBottom: 15,
  },
  text: { fontSize: 16, color: "#555", textAlign: "center" },
});
