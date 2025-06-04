import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";

const filters = {
  Пол: ["Всі", "Жіноча", "Чоловіча"],
  Кваліфікація: ["Всі", "Психолог", "Коуч", "Психотерапевт"],
  Теми: ["Всі", "Стрес", "Сім'я", "Кар'єра"],
  Підхід: ["Всі", "Когнітивний", "Психодинамічний", "Гуманістичний"],
  Мова: ["Всі", "Українська", "Англійська"],
};

const specialistsData = [
  {
    id: "1",
    name: "Олена Іваненко",
    gender: "Жіноча",
    qualification: "Психолог",
    topics: ["Стрес", "Сім'я"],
    approach: "Когнітивний",
    language: "Українська",
  },
  {
    id: "2",
    name: "Максим Коваль",
    gender: "Чоловіча",
    qualification: "Коуч",
    topics: ["Кар'єра"],
    approach: "Гуманістичний",
    language: "Українська",
  },
  {
    id: "3",
    name: "Ірина Петренко",
    gender: "Жіноча",
    qualification: "Психотерапевт",
    topics: ["Стрес"],
    approach: "Психодинамічний",
    language: "Англійська",
  },
  // ... додай інших спеціалістів тут
];

function Dropdown({ label, options, selected, onSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        style={styles.dropdownHeader}
        onPress={() => setOpen(!open)}
      >
        <Text style={styles.dropdownHeaderText}>{label}: </Text>
        <Text style={styles.dropdownSelectedText}>{selected}</Text>
        <Text style={styles.dropdownArrow}>{open ? "▲" : "▼"}</Text>
      </TouchableOpacity>
      {open && (
        <View style={styles.dropdownList}>
          <ScrollView style={{ maxHeight: 120 }}>
            {options.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[
                  styles.dropdownItem,
                  opt === selected && styles.dropdownItemSelected,
                ]}
                onPress={() => {
                  onSelect(opt);
                  setOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    opt === selected && styles.dropdownItemTextSelected,
                  ]}
                >
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

export default function Specialists() {
  const [selectedGender, setSelectedGender] = useState("Всі");
  const [selectedQualification, setSelectedQualification] = useState("Всі");
  const [selectedTopics, setSelectedTopics] = useState("Всі");
  const [selectedApproach, setSelectedApproach] = useState("Всі");
  const [selectedLanguage, setSelectedLanguage] = useState("Всі");

  // Фільтрація фахівців за всіма критеріями
  const filteredSpecialists = specialistsData.filter((spec) => {
    return (
      (selectedGender === "Всі" || spec.gender === selectedGender) &&
      (selectedQualification === "Всі" ||
        spec.qualification === selectedQualification) &&
      (selectedTopics === "Всі" || spec.topics.includes(selectedTopics)) &&
      (selectedApproach === "Всі" || spec.approach === selectedApproach) &&
      (selectedLanguage === "Всі" || spec.language === selectedLanguage)
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Спеціалісти MindConnect</Text>

      <Dropdown
        label="Пол"
        options={filters.Пол}
        selected={selectedGender}
        onSelect={setSelectedGender}
      />
      <Dropdown
        label="Кваліфікація"
        options={filters.Кваліфікація}
        selected={selectedQualification}
        onSelect={setSelectedQualification}
      />
      <Dropdown
        label="Теми"
        options={filters.Теми}
        selected={selectedTopics}
        onSelect={setSelectedTopics}
      />
      <Dropdown
        label="Підхід"
        options={filters.Підхід}
        selected={selectedApproach}
        onSelect={setSelectedApproach}
      />
      <Dropdown
        label="Мова"
        options={filters.Мова}
        selected={selectedLanguage}
        onSelect={setSelectedLanguage}
      />

      <FlatList
        data={filteredSpecialists}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.info}>
              {item.gender} | {item.qualification} | {item.language}
            </Text>
            <Text style={styles.description}>
              Теми: {item.topics.join(", ")} {"\n"}
              Підхід: {item.approach}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.noResults}>Спеціалісти не знайдені</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f0fa",
    padding: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#4b3b7f",
    marginBottom: 15,
    textAlign: "center",
  },
  dropdownContainer: {
    marginBottom: 12,
  },
  dropdownHeader: {
    backgroundColor: "#6c63ff",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownHeaderText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  dropdownSelectedText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    flex: 1,
    textAlign: "right",
    marginRight: 8,
  },
  dropdownArrow: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  dropdownList: {
    backgroundColor: "#e0dfff",
    borderRadius: 8,
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#6c63ff",
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownItemSelected: {
    backgroundColor: "#6c63ff",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#4b3b7f",
  },
  dropdownItemTextSelected: {
    color: "#fff",
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4b3b7f",
  },
  info: {
    fontSize: 14,
    color: "#888",
    marginVertical: 6,
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
  noResults: {
    marginTop: 30,
    fontSize: 16,
    textAlign: "center",
    color: "#999",
  },
});
