// mobile/screens/About.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Про нас</Text>
      <Text style={styles.text}>
        Інформація про команду, місію, контакти тощо.
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
