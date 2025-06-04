// mobile/screens/Vacancies.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Vacancies() {
  return (
    <View style={styles.screenCenter}>
      <Text style={styles.title}>Вакансії</Text>
      <Text style={styles.text}>Тут буде список вакансій...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screenCenter: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 26, fontWeight: "700", color: "#333", marginBottom: 12 },
  text: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
