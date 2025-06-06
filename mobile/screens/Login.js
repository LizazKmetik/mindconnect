import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
} from "react-native";

export default function Login({ user, onLogin, onLogout }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [justRegistered, setJustRegistered] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (user) {
      setWelcomeMessage(
        justRegistered
          ? `Вітаю, ${user.name}!`
          : `Раді тебе бачити, ${user.name}!`
      );
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
      setWelcomeMessage("");
      setJustRegistered(false);
    }
  }, [user, justRegistered]);

  const resetFields = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleLogin = () => {
    if (!name || !email || !password) {
      Alert.alert("Помилка", "Будь ласка, заповніть Ім'я, Email та Пароль.");
      return;
    }
    setJustRegistered(false);
    onLogin({ email, name });
    resetFields();
  };

  const handleRegister = () => {
    if (!name || !email || !password) {
      Alert.alert("Помилка", "Будь ласка, заповніть усі поля.");
      return;
    }
    setJustRegistered(true);
    onLogin({ email, name });
    resetFields();
  };

  if (user) {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.profileBox, { opacity: fadeAnim }]}>
          <Text style={styles.welcome}>{welcomeMessage}</Text>
          <Text style={styles.email}>Email: {user.email}</Text>
          <Text style={styles.subText}>
            Тут ти можеш переглянути свій профіль або вийти, щоб увійти під
            іншим акаунтом.
          </Text>
          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.7}
            onPress={onLogout}
          >
            <Text style={styles.logoutButtonText}>Вийти</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isLogin ? (
        <>
          <Text style={styles.title}>Увійдіть</Text>
          <TextInput
            style={styles.input}
            placeholder="Ім'я"
            placeholderTextColor="rgba(122, 99, 249, 0.7)"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="rgba(122, 99, 249, 0.7)"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Пароль"
            placeholderTextColor="rgba(122, 99, 249, 0.7)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Увійти</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => {
              resetFields();
              setIsLogin(false);
              setJustRegistered(false);
            }}
          >
            <Text style={styles.switchButtonText}>Зареєструватися</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>Зареєструйтесь</Text>
          <TextInput
            style={styles.input}
            placeholder="Ім'я"
            placeholderTextColor="rgba(122, 99, 249, 0.7)"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="rgba(122, 99, 249, 0.7)"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Пароль"
            placeholderTextColor="rgba(122, 99, 249, 0.7)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Зареєструватися</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => {
              resetFields();
              setIsLogin(true);
              setJustRegistered(false);
            }}
          >
            <Text style={styles.switchButtonText}>Увійти</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e4daf7",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#7a63f9",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    color: "#7a63f9",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 25,
    fontSize: 17,
    marginBottom: 12,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#7a63f9",
    marginTop: 10,
    borderRadius: 25,
    paddingVertical: 12,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  switchButton: {
    marginTop: 12,
    paddingVertical: 10,
  },
  switchButtonText: {
    color: "#7a63f9",
    fontWeight: "600",
    textAlign: "center",
  },
  profileBox: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: 24,
    shadowColor: "#7a63f9",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  welcome: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
    color: "#7a63f9",
  },
  email: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 18,
  },
  subText: {
    fontSize: 16,
    fontWeight: "300",
    marginBottom: 22,
  },
  logoutButton: {
    backgroundColor: "#7a63f9",
    paddingVertical: 12,
    borderRadius: 20,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
});
