// mobile/screens/Services.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Services() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Послуги</Text>
      <Text style={styles.text}>
        Опис послуг, які надаються у вашому додатку.
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
