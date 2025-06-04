import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

export default function About() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Про MindConnect</Text>

      <Text style={styles.sectionText}>
        Ми створили MindConnect, щоб забезпечити кожного доступом до якісної
        психологічної допомоги онлайн. Наша платформа — це міст між психологами
        та людьми, які шукають підтримки, розуміння та зцілення.
      </Text>

      <Image source={require("../img/about.png")} style={styles.aboutImage} />

      <Text style={styles.subHeader}>Наша місія</Text>
      <Text style={styles.sectionText}>
        Наша місія — зробити психотерапію доступною, професійною та сучасною.
      </Text>

      <Text style={styles.subHeader}>Наша команда</Text>

      <View style={styles.teamBlock}>
        <Image source={require("../img/team1.png")} style={styles.teamImage} />
        <Text style={styles.teamName}>Кметик Єлизавета</Text>
        <Text style={styles.teamRole}>Засновниця, клінічний психолог</Text>
      </View>

      <View style={styles.teamBlock}>
        <Image source={require("../img/team2.png")} style={styles.teamImage} />
        <Text style={styles.teamName}>Никифорова Анастасія</Text>
        <Text style={styles.teamRole}>Front-end розробник</Text>
      </View>

      <View style={styles.teamBlock}>
        <Image source={require("../img/team3.png")} style={styles.teamImage} />
        <Text style={styles.teamName}>Чеберяк Остап</Text>
        <Text style={styles.teamRole}>Back-end розробник</Text>
      </View>

      <View style={styles.teamBlock}>
        <Image source={require("../img/team4.png")} style={styles.teamImage} />
        <Text style={styles.teamName}>Якубович Єлизавета</Text>
        <Text style={styles.teamRole}>UX/UI дизайнер</Text>
      </View>

      <Text style={styles.subHeader}>Наші цінності</Text>
      <Text style={styles.sectionText}>
        • Конфіденційність та безпека кожного користувача{"\n"}• Доступність та
        якість психотерапії{"\n"}• Сучасність, емпатія, підтримка
      </Text>

      <Text style={styles.subHeader}>Контактна інформація</Text>
      <Text style={styles.sectionText}>
        📧 Email: support@mindconnect.ua{"\n"}
        📞 Телефон: +38 (050) 123-45-67{"\n"}
        📍 Адреса: м. Київ, вул. Вільна, 12
      </Text>
      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e4daf7",
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    backgroundColor: "#7B4BB7",
    color: "#fff",
    padding: 14,
    borderRadius: 10,
    textAlign: "center",
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  sectionText: {
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
  },
  aboutImage: {
    width: "100%",
    height: 180,
    resizeMode: "contain",
    marginVertical: 20,
  },
  teamBlock: {
    alignItems: "center",
    marginBottom: 20,
  },
  teamImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 8,
  },
  teamName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  teamRole: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
