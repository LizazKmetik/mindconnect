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

        <View style={styles.formBox}>
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
            style={[styles.input, styles.textArea]}
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
        </View>

        <View style={styles.footerTextContainer}>
          <Text style={styles.footerText}>
            Ми будем раді бачити тебе у нашій команді!
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#e4daf7",
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "#7a63f9",
    fontFamily: "Comic Sans MS",
  },
  formBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: "Comic Sans MS",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#7a63f9",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Comic Sans MS",
  },
  messageBox: {
    alignItems: "center",
    marginTop: 15,
  },
  messageText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Comic Sans MS",
  },
  footerTextContainer: {
    marginTop: 30,
    marginBottom: 40,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  footerText: {
    color: "#7a63f9",
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
    fontFamily: "Comic Sans MS",
  },
});
