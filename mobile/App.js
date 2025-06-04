import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

export default function App() {
  const [screen, setScreen] = useState("home");

  const renderScreen = () => {
    switch (screen) {
      case "home":
        return (
          <>
            <Text style={styles.title}>Пошук психолога</Text>
            <TouchableOpacity style={styles.mainButton}>
              <Text style={styles.mainButtonText}>Підібрати спеціаліста</Text>
            </TouchableOpacity>
          </>
        );
      case "vacancies":
        return <Text style={styles.title}>Вакансії</Text>;
      case "services":
        return <Text style={styles.title}>Послуги</Text>;
      case "about":
        return <Text style={styles.title}>Про нас</Text>;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderScreen()}

      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={() => setScreen("home")}
          style={styles.navButton}
        >
          <Text>Головна</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setScreen("vacancies")}
          style={styles.navButton}
        >
          <Text>Вакансії</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setScreen("services")}
          style={styles.navButton}
        >
          <Text>Послуги</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setScreen("about")}
          style={styles.navButton}
        >
          <Text>Про нас</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    marginTop: 50,
  },
  mainButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    marginTop: 30,
    borderRadius: 10,
    alignSelf: "center",
  },
  mainButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  navButton: {
    padding: 10,
  },
});
