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
import Login from "./screens/Login";
import Other from "./screens/Other";

const logoImage = require("./img/logo.png");

export default function App() {
  const [screen, setScreen] = useState("home");
  const [user, setUser] = useState(null);

  const renderScreen = () => {
    switch (screen) {
      case "login":
        return (
          <Login
            user={user}
            onLogin={(loggedUser) => {
              setUser(loggedUser);
              setScreen("home");
            }}
            onLogout={() => {
              setUser(null);
              setScreen("login");
            }}
          />
        );
      case "home":
        return (
          <Home onPickSpecialist={() => setScreen("specialist")} user={user} />
        );
      case "specialist":
        return <Specialist user={user} />;
      case "vacancies":
        return <Vacancies user={user} />;
      case "services":
        return <Services user={user} />;
      case "about":
        return <About user={user} />;
      case "other":
        return <Other user={user} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logoImage} style={styles.logo} resizeMode="contain" />
        <TouchableOpacity
          onPress={() => setScreen("login")}
          style={styles.profileIcon}
        >
          <Text style={{ fontSize: 22 }}>👤</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>{renderScreen()}</View>

      <View style={styles.navBar}>
        {[
          { label: "Головна", key: "home" },
          { label: "Вакансії", key: "vacancies" },
          { label: "Послуги", key: "services" },
          { label: "Про нас", key: "about" },
          { label: "Інше", key: "other" },
        ].map(({ label, key }) => (
          <TouchableOpacity
            key={key}
            onPress={() => setScreen(key)}
            style={[styles.navButton, screen === key && styles.navButtonActive]}
          >
            <Text
              style={[styles.navText, screen === key && styles.navTextActive]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
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
  profileIcon: {
    position: "absolute",
    right: 15,
    top: 43,
  },
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
