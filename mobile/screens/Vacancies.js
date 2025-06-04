import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

export default function Vacancies() {
  const [form, setForm] = useState({
    pib: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    description: "",
  });

  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("green");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    const isEmpty = Object.values(form).some((field) => field.trim() === "");

    if (isEmpty) {
      setMessage("Будь ласка, заповніть всі поля");
      setMessageColor("red");
    } else {
      setMessage("Заявка відправлена!");
      setMessageColor("green");
    }

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();

      if (!isEmpty) {
        setForm({
          pib: "",
          email: "",
          phone: "",
          specialization: "",
          experience: "",
          description: "",
        });
      }
    }, 3000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          Заповніть заявку на вакансію спеціаліста
        </Text>

        <TextInput
          placeholder="ПІБ"
          style={styles.input}
          value={form.pib}
          onChangeText={(text) => handleChange("pib", text)}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
        />
        <TextInput
          placeholder="Телефон"
          style={styles.input}
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(text) => handleChange("phone", text)}
        />
        <TextInput
          placeholder="Спеціалізація"
          style={styles.input}
          value={form.specialization}
          onChangeText={(text) => handleChange("specialization", text)}
        />
        <TextInput
          placeholder="Стаж (років)"
          style={styles.input}
          keyboardType="numeric"
          value={form.experience}
          onChangeText={(text) => handleChange("experience", text)}
        />
        <TextInput
          placeholder="Короткий опис про себе"
          style={[styles.input, { height: 80 }]}
          multiline
          value={form.description}
          onChangeText={(text) => handleChange("description", text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Відправити заявку</Text>
        </TouchableOpacity>

        <Animated.View style={[styles.messageBox, { opacity: fadeAnim }]}>
          <Text style={[styles.messageText, { color: messageColor }]}>
            {message}
          </Text>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#f5f5f5",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#6C63FF",
    fontFamily: "Comic Sans MS",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: "Comic Sans MS",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    backgroundColor: "#6C63FF",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Comic Sans MS",
  },
  messageBox: {
    alignItems: "center",
    marginTop: -10,
  },
  messageText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Comic Sans MS",
  },
});
