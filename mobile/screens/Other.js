import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function Other() {
  const [showMethods, setShowMethods] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const [expandedQuestions, setExpandedQuestions] = useState({});

  const goBack = () => {
    setShowMethods(false);
    setShowServices(false);
    setShowFaq(false);
    setExpandedQuestions({});
  };

  const faqData = [
    {
      title: "💳 Оплата",
      items: [
        {
          question: "Як здійснюється оплата?",
          answer:
            "Оплата здійснюється безпосередньо на сайті під час оформлення сесії. Після вибору фахівця та зручного часу вас буде блок для заповнення даних для оплати.",
        },
        {
          question: "Чи можу я сплатити після сесії?",
          answer:
            "Ні, бронювання сесії відбувається лише після повної передоплати.",
        },
        {
          question: "Які є способи оплати, крім як за посиланням?",
          answer:
            "Можливі інші варіанти: картка, PayPal — уточнюйте в фахівця.",
        },
        {
          question: "Які гарантії, що мене не надурять?",
          answer:
            "Сесії підтверджуються платформою. У випадку скасування з боку фахівця — кошти повертаються.",
        },
        {
          question: "Чи можу я сплатити кілька сесій одразу?",
          answer: "Так, і деякі фахівці надають знижки при передоплаті пакету.",
        },
        {
          question: "Чи можу я оплатити сесію іншій людині?",
          answer: "Так, вкажіть ім’я та контакт отримувача перед оплатою.",
        },
        {
          question: "Чи можу я скасувати/перенести зустріч?",
          answer:
            "Можна скасувати не пізніше ніж за 12 годин. Інакше оплата не повертається.",
        },
        {
          question: "Як відшкодувати гроші?",
          answer:
            "Повернення коштів здійснюється протягом 3–5 днів, якщо сеанс не відбувся.",
        },
      ],
    },
    {
      title: "⏰ Перед сесією",
      items: [
        {
          question: "Як треба готуватись до сеансу?",
          answer:
            "Знайди спокійне місце, підготуйте навушники, переконайся в стабільному інтернеті.",
        },
        {
          question: "Де відбуватиметься онлайн-сесія?",
          answer: "У Google Meet. Посилання — в особистому чаті з фахівцем.",
        },
        {
          question: "Як зі мною зв’яжеться фахівець?",
          answer:
            "Після призначення дати та часу сесії фахівець домовляється з вами про зручний спосіб звʼязку й у день сесії дає посилання на онлайн-зустріч.",
        },
      ],
    },
    {
      title: "📌 Інше",
      items: [
        {
          question: "Чи надаєте ви документи для страхової?",
          answer:
            "Так, за попереднім погодженням ми можемо підготувати підтвердження сеансів.",
        },
        {
          question: "Я неповнолітній. Як вибрати фахівця?",
          answer: "Оберіть того, хто працює з підлітками — це вказано в описі.",
        },
        {
          question: "Чи потрібна згода батьків?",
          answer:
            "Так, згода одного з батьків/опікунів обов'язкова для консультацій з неповнолітніми.",
        },
        {
          question: "Чи є подарункові сертифікати?",
          answer:
            "Так! Ми пропонуємо сертифікати на сесії, які можна подарувати близькій людині.",
        },
      ],
    },
  ];

  const toggleQuestion = (sectionIndex, questionIndex) => {
    const key = `${sectionIndex}-${questionIndex}`;
    setExpandedQuestions((prev) => {
      const newState = { ...prev };
      if (newState[key]) {
        delete newState[key];
      } else {
        newState[key] = true;
      }
      return newState;
    });
  };

  return (
    <View style={styles.container}>
      {(showMethods || showServices || showFaq) && (
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Text style={styles.backBtnText}>← Назад</Text>
        </TouchableOpacity>
      )}

      {!showMethods && !showServices && !showFaq && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setShowMethods(true);
              setShowServices(false);
              setShowFaq(false);
            }}
          >
            <Text style={styles.buttonText}>Методи</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setShowServices(true);
              setShowMethods(false);
              setShowFaq(false);
            }}
          >
            <Text style={styles.buttonText}>Послуги</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setShowFaq(true);
              setShowMethods(false);
              setShowServices(false);
            }}
          >
            <Text style={styles.buttonText}>Популярні теми</Text>
          </TouchableOpacity>
        </View>
      )}

      {showMethods && (
        <ScrollView style={styles.contentScroll}>
          <Text style={styles.contentTitle}>Методи психологічної допомоги</Text>
          <Text style={styles.contentText}>
            Наші фахівці застосовують різноманітні науково обґрунтовані методи
            терапії, залежно від індивідуальних потреб клієнта.
          </Text>

          <Text style={styles.contentText}>
            • Арт-терапія: самовираження через творчість як спосіб опрацювання
            емоцій.
          </Text>
          <Text style={styles.contentText}>
            • Позитивна психотерапія: акцент на ресурси, потенціал і внутрішню
            силу людини.
          </Text>
          <Text style={styles.contentText}>
            • Психоаналіз: вивчення несвідомих процесів, дитячих переживань і
            захисних механізмів.
          </Text>
          <Text style={styles.contentText}>
            • Екзистенційна психотерапія: пошук сенсу життя, свободи,
            відповідальності, смерті, ізоляції.
          </Text>
          <Text style={styles.contentText}>
            • Символдрама: робота з уявленнями та образами для розкриття
            внутрішнього світу.
          </Text>
          <Text style={styles.contentText}>
            • Транзакційний Аналіз: аналіз ролей (дитина–дорослий–батько) та
            сценаріїв у спілкуванні.
          </Text>
          <Text style={styles.contentText}>
            • КПТ (когнітивно-поведінкова терапія): зміна деструктивного
            мислення та поведінки.
          </Text>
          <Text style={styles.contentText}>
            • Гештальт-терапія: фокус на «тут і зараз», усвідомлення емоцій і
            незавершених ситуацій.
          </Text>
          <Text style={styles.contentText}>
            • Клієнт-центрована терапія: підтримка без оцінки, прийняття
            клієнта, емпатія, діалог.
          </Text>
          <Text style={styles.contentText}>
            • Психодрама: драматизація життєвих ситуацій, відтворення діалогів,
            розігрування ролей.
          </Text>
          <Text style={styles.contentText}>
            • Схема-терапія: робота з глибокими переконаннями, що виникають у
            дитинстві.
          </Text>
          <Text style={styles.contentText}>
            • Системна сімейна терапія: зміна динаміки в родині, врахування
            взаємозв’язків між членами.
          </Text>
          <Text style={styles.contentText}>
            • EMDR: десенсибілізація і переробка травматичного досвіду за
            допомогою рухів очей.
          </Text>
          <Text style={styles.contentText}>
            • Тілесно-орієнтована терапія: увага до тіла як носія емоцій, напруг
            і блоків.
          </Text>
          <Text style={styles.contentText}>
            • DBT: діалектико-поведінкова терапія для людей з емоційною
            нестабільністю.
          </Text>
          <Text style={styles.contentText}>
            • EFT: емоційно-фокусована терапія для відновлення емоційного
            зв’язку у парі.
          </Text>
          <Text style={styles.contentText}>
            • ACT: терапія прийняття й відповідальності – навчання жити, не
            уникаючи страждання.
          </Text>
        </ScrollView>
      )}

      {showServices && (
        <ScrollView style={styles.contentScroll}>
          <Text style={styles.contentTitle}>Психологічні послуги</Text>

          <Text style={styles.contentSubtitle}>Індивідуальна терапія</Text>
          <Text style={styles.contentText}>
            • Тривожність: подолання панічних атак і страхів.
          </Text>
          <Text style={styles.contentText}>
            • Депресія: підтримка в кризових станах та вихід із затяжних
            депресивних фаз.
          </Text>
          <Text style={styles.contentText}>
            • Стрес: методи релаксації та відновлення емоційного балансу.
          </Text>
          <Text style={styles.contentText}>
            • Посттравматичний синдром: робота з травматичними подіями минулого.
          </Text>
          <Text style={styles.contentText}>
            • Психосоматика: розуміння зв’язку між тілом і психікою.
          </Text>
          <Text style={styles.contentText}>
            • Особистісний розвиток: робота над самооцінкою і впевненістю.
          </Text>
          <Text style={styles.contentText}>
            • Втрата і горе: підтримка у переживанні втрат.
          </Text>

          <Text style={styles.contentSubtitle}>Сімейна та парна терапія</Text>
          <Text style={styles.contentText}>
            • Конфлікти у парі: відновлення довіри та діалогу.
          </Text>
          <Text style={styles.contentText}>
            • Психологія сім’ї: робота з ролями, взаємовідносинами.
          </Text>
          <Text style={styles.contentText}>
            • Проблеми з дітьми: поведінкові труднощі, підтримка батьків.
          </Text>
          <Text style={styles.contentText}>
            • Домашнє насильство: безпечне планування виходу з ситуації.
          </Text>

          <Text style={styles.contentSubtitle}>Професійна підтримка</Text>
          <Text style={styles.contentText}>
            • Вигоряння: пошук ресурсів та відновлення сил.
          </Text>
          <Text style={styles.contentText}>
            • Конфлікти на роботі: налагодження комунікації та вирішення
            проблем.
          </Text>
          <Text style={styles.contentText}>
            • Кар’єрне консультування: допомога у виборі та зміні професії.
          </Text>

          <Text style={styles.contentSubtitle}>Особистісний розвиток</Text>
          <Text style={styles.contentText}>
            • Самореалізація: пошук цінностей і цілей.
          </Text>
          <Text style={styles.contentText}>
            • Розвиток комунікативних навичок.
          </Text>
          <Text style={styles.contentText}>
            • Підготовка до батьківства: психологічна підтримка майбутніх
            батьків.
          </Text>
          <Text style={styles.contentText}>
            • Кризові стани: допомога в адаптації до змін.
          </Text>
        </ScrollView>
      )}

      {showFaq && (
        <ScrollView style={styles.contentScroll}>
          {faqData.map((section, i) => (
            <View key={i} style={styles.faqSection}>
              <Text style={styles.faqSectionTitle}>{section.title}</Text>
              {section.items.map((item, j) => {
                const key = `${i}-${j}`;
                const expanded = expandedQuestions[key];
                return (
                  <View key={j} style={styles.faqItem}>
                    <TouchableOpacity onPress={() => toggleQuestion(i, j)}>
                      <Text style={styles.faqQuestion}>{item.question}</Text>
                    </TouchableOpacity>
                    {expanded && (
                      <Text style={styles.faqAnswer}>{item.answer}</Text>
                    )}
                  </View>
                );
              })}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E6FA",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  backBtn: {
    marginBottom: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: "flex-start",
  },
  backBtnText: {
    color: "#4B0082",
    fontSize: 18,
  },
  buttonsContainer: {
    marginTop: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#7B68EE",
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 25,
    marginVertical: 10,
    minWidth: 220,
    shadowColor: "#4B0082",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  contentScroll: {
    flex: 1,
    marginBottom: 40,
  },
  contentTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#4B0082",
    marginBottom: 14,
    textAlign: "center",
  },
  contentSubtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4B0082",
    marginTop: 18,
    marginBottom: 10,
  },
  contentText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#32194D",
    paddingLeft: 10,
  },
  faqSection: {
    marginBottom: 25,
  },
  faqSectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#4B0082",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#D8BFD8",
    paddingBottom: 6,
  },
  faqItem: {
    marginBottom: 12,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: "600",
    color: "#7B68EE",
  },
  faqAnswer: {
    fontSize: 15,
    color: "#32194D",
    marginTop: 6,
    paddingLeft: 14,
  },
});
