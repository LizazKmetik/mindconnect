import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function Login({ onLogin, currentUser }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleLogin = () => {
    if (!email || !name) {
      Alert.alert("Помилка", "Будь ласка, заповніть всі поля.");
      return;
    }
    onLogin({ email, name });
  };

  return (
    <View style={styles.container}>
      {currentUser ? (
        <View style={styles.profileBox}>
          <Text style={styles.welcome}>Вітаємо, {currentUser.name}!</Text>
          <Text style={styles.email}>Email: {currentUser.email}</Text>
        </View>
      ) : (
        <>
          <Text style={styles.title}>Увійдіть або зареєструйтесь</Text>
          <TextInput
            style={styles.input}
            placeholder="Ім'я"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Увійти</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#7a63f9",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  profileBox: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  welcome: {
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    marginTop: 10,
    color: "#555",
  },
});
