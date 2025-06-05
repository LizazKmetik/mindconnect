import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

import Home from "./screens/Home";
import Vacancies from "./screens/Vacancies";
import Services from "./screens/Services";
import About from "./screens/About";
import Specialist from "./screens/Specialist";

const logoImage = require("./img/logo.png");

export default function App() {
  const [screen, setScreen] = useState("home");

  const renderScreen = () => {
    switch (screen) {
      case "home":
        return <Home onPickSpecialist={() => setScreen("specialist")} />;
      case "specialist":
        return <Specialist />;
      case "vacancies":
        return <Vacancies />;
      case "services":
        return <Services />;
      case "about":
        return <About />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logoImage} style={styles.logo} resizeMode="contain" />
      </View>

      <View style={styles.content}>{renderScreen()}</View>

      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={() => setScreen("home")}
          style={[
            styles.navButton,
            screen === "home" && styles.navButtonActive,
          ]}
        >
          <Text
            style={[styles.navText, screen === "home" && styles.navTextActive]}
          >
            Головна
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setScreen("vacancies")}
          style={[
            styles.navButton,
            screen === "vacancies" && styles.navButtonActive,
          ]}
        >
          <Text
            style={[
              styles.navText,
              screen === "vacancies" && styles.navTextActive,
            ]}
          >
            Вакансії
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setScreen("services")}
          style={[
            styles.navButton,
            screen === "services" && styles.navButtonActive,
          ]}
        >
          <Text
            style={[
              styles.navText,
              screen === "services" && styles.navTextActive,
            ]}
          >
            Послуги
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setScreen("about")}
          style={[
            styles.navButton,
            screen === "about" && styles.navButtonActive,
          ]}
        >
          <Text
            style={[styles.navText, screen === "about" && styles.navTextActive]}
          >
            Про нас
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FB" },
  logoContainer: {
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#E4E6EB",
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  logo: { width: 140, height: 60 },
  content: { flex: 1 },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#E4E6EB",
    backgroundColor: "#fff",
  },
  navButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  navButtonActive: {
    backgroundColor: "#7a63f9",
  },
  navText: {
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
  },
  navTextActive: {
    color: "#fff",
  },
});
