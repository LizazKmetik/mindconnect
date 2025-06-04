import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";

export default function Services() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Психологічні послуги</Text>
      <Text style={styles.intro}>
        Наші фахівці працюють з широким колом запитів, допомагаючи клієнтам
        знайти внутрішню опору, подолати складнощі та покращити якість життя.
      </Text>

      <Section
        title="Стосунки з собою"
        items={[
          "Дратівливість: керування емоційними реакціями та зменшення напруги.",
          "Панічні атаки: стабілізація та навчання методам самодопомоги.",
          "Самотність: підтримка у створенні здорових зв’язків та прийнятті себе.",
          "Спроби самогубства: кризова допомога та пошук сенсу життя.",
          "Депресивні стани: робота з втратою енергії, апатією, безнадією.",
          "Тривожні стани: подолання постійного неспокою та очікування загрози.",
          "Втома: відновлення ресурсів та емоційної енергії.",
          "Самооцінка та самоцінність: зміцнення впевненості та прийняття себе.",
          "Навʼязливі думки та ритуали: робота з ОКР, зниження тривоги.",
          "Хімічні залежності: підтримка в подоланні алкоголізму, наркозалежності тощо.",
          "Психосоматика: виявлення психологічних причин тілесних симптомів.",
          "Ставлення до їжі: розлади харчової поведінки, переїдання, анорексія.",
        ]}
      />

      <Section
        title="Стосунки з іншими"
        items={[
          "Сімейні стосунки: гармонізація відносин, розв’язання конфліктів.",
          "Інтимність та сексуальність: прийняття себе та партнера, відкритість.",
          "Романтичні стосунки: підтримка у створенні та збереженні близькості.",
          "Співзалежність: вихід із нездорових емоційних прив’язаностей.",
          "Абʼюз, емоційне насилля: психологічне відновлення після токсичних стосунків.",
        ]}
      />

      <Section
        title="Діяльність"
        items={[
          "Емоційне вигорання: профілактика та відновлення після перенавантаження.",
          "Самовизначення та самоідентифікація: пошук себе, професійної та особистої ролі.",
          "Ставлення до грошей: подолання страхів, пов’язаних із фінансами.",
          "Прокрастинація: робота з внутрішніми бар’єрами до дії.",
          "РДУГ: підтримка при синдромі дефіциту уваги з гіперактивністю (дорослі).",
        ]}
      />

      <Section
        title="Нові умови життя"
        items={[
          "Втрата та горе: проживання втрат, етапи прощання, підтримка.",
          "Адаптація, еміграція: труднощі зміни середовища, культурний шок.",
          "Народження дитини: підтримка жінок та сімей у новому етапі життя.",
          "ПТСР: робота з травмами війни, насилля, аварій тощо.",
          "Кризи і травми: супровід у складних переломних ситуаціях.",
        ]}
      />
    </ScrollView>
  );
}

function Section({ title, items }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((item, idx) => (
        <Text key={idx} style={styles.item}>
          • {item}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e4daf7",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fefefe",
    backgroundColor: "#7a63f9",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "sans-serif-rounded",
    overflow: "hidden",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  intro: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
    color: "#4b4b4b",
    fontFamily: "sans-serif-rounded",
    textAlign: "center",
  },
  section: {
    marginBottom: 28,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    color: "#6C63FF",
    fontFamily: "sans-serif-rounded",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 6,
  },
  item: {
    fontSize: 15,
    lineHeight: 22,
    color: "#333",
    marginBottom: 8,
    fontFamily: "sans-serif-rounded",
  },
});
