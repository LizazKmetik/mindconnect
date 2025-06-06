import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager,
  Image,
} from "react-native";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

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
    image: require("../img/iryna.jpg"),
  },
  {
    id: "2",
    name: "Максим Коваль",
    gender: "Чоловіча",
    qualification: "Коуч",
    topics: ["Кар'єра"],
    approach: "Гуманістичний",
    language: "Українська",
    image: require("../img/maksos.jpg"),
  },
  {
    id: "3",
    name: "Ірина Петренко",
    gender: "Жіноча",
    qualification: "Психотерапевт",
    topics: ["Стрес"],
    approach: "Психодинамічний",
    language: "Англійська",
    image: require("../img/olena.jpg"),
  },
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
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];
  const times = ["09:00", "11:00", "13:00", "15:00", "17:00"];

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

  const handleBookPress = () => {
    LayoutAnimation.easeInEaseOut();
    setBookingOpen(true);
  };

  const handleConfirm = () => {
    if (selectedDay && selectedTime) {
      LayoutAnimation.easeInEaseOut();
      setConfirmed(true);
    }
  };

  const renderFilters = () => (
    <View>
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
    </View>
  );

  if (selectedSpecialist) {
    return (
      <View style={[styles.container, { paddingBottom: 30 }]}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{selectedSpecialist.name}</Text>
              <Text style={styles.info}>
                {selectedSpecialist.gender} | {selectedSpecialist.qualification}{" "}
                | {selectedSpecialist.language}
              </Text>
            </View>
            <Image
              source={selectedSpecialist.image}
              style={styles.avatarSmall}
            />
          </View>

          <Text style={styles.description}>
            Теми: {selectedSpecialist.topics.join(", ")}
            {"\n"}Підхід: {selectedSpecialist.approach}
          </Text>

          {!bookingOpen && (
            <TouchableOpacity
              style={styles.bookButton}
              onPress={handleBookPress}
            >
              <Text style={styles.bookButtonText}>Забронювати</Text>
            </TouchableOpacity>
          )}

          {bookingOpen && !confirmed && (
            <View style={{ marginTop: 20 }}>
              <Text style={styles.sectionTitle}>Оберіть день:</Text>
              <View style={styles.selectRow}>
                {days.map((day) => (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.selectItem,
                      selectedDay === day && styles.selectedItem,
                    ]}
                    onPress={() => setSelectedDay(day)}
                  >
                    <Text
                      style={[
                        styles.selectText,
                        selectedDay === day && styles.selectedText,
                      ]}
                    >
                      {day}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.sectionTitle}>Оберіть час:</Text>
              <View style={styles.selectRow}>
                {times.map((time) => (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.selectItem,
                      selectedTime === time && styles.selectedItem,
                    ]}
                    onPress={() => setSelectedTime(time)}
                  >
                    <Text
                      style={[
                        styles.selectText,
                        selectedTime === time && styles.selectedText,
                      ]}
                    >
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}
              >
                <Text style={styles.confirmButtonText}>Підтвердити</Text>
              </TouchableOpacity>
            </View>
          )}

          {confirmed && (
            <View style={{ marginTop: 30, alignItems: "center" }}>
              <Text
                style={{ fontSize: 20, color: "#7a63f9", fontWeight: "700" }}
              >
                🎉 Дякуємо за бронювання!
              </Text>
              <TouchableOpacity
                onPress={() => {
                  LayoutAnimation.easeInEaseOut();
                  setSelectedSpecialist(null);
                  setBookingOpen(false);
                  setConfirmed(false);
                  setSelectedDay(null);
                  setSelectedTime(null);
                }}
                style={{ marginTop: 15 }}
              >
                <Text style={{ color: "#555" }}>⬅ Назад до списку</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={filteredSpecialists}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={renderFilters}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            setSelectedSpecialist(item);
            LayoutAnimation.easeInEaseOut();
          }}
        >
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.info}>
                {item.gender} | {item.qualification} | {item.language}
              </Text>
            </View>
            <Image source={item.image} style={styles.avatarSmall} />
          </View>
          <Text style={styles.description}>
            Теми: {item.topics.join(", ")}
            {"\n"}Підхід: {item.approach}
          </Text>
        </TouchableOpacity>
      )}
      ListEmptyComponent={
        <Text style={styles.noResults}>Спеціалісти не знайдені</Text>
      }
    />
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
    color: "#7a63f9",
    marginBottom: 15,
    textAlign: "center",
  },
  dropdownContainer: {
    marginBottom: 12,
  },
  dropdownHeader: {
    backgroundColor: "#7a63f9",
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
    borderColor: "#7a63f9",
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownItemSelected: {
    backgroundColor: "#7a63f9",
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
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  avatarSmall: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#7a63f9",
  },
  info: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
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
  bookButton: {
    backgroundColor: "#7a63f9",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  bookButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 8,
  },
  selectRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  selectItem: {
    backgroundColor: "#ddd",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 8,
    marginRight: 8,
  },
  selectedItem: {
    backgroundColor: "#7a63f9",
  },
  selectText: {
    color: "#333",
  },
  selectedText: {
    color: "#fff",
    fontWeight: "600",
  },
  confirmButton: {
    backgroundColor: "#4caf50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  confirmButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
});
