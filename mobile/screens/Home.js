// mobile/screens/Home.js
import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";

const { width } = Dimensions.get("window");
const bannerImages = [
  require("../img/slide1.png"),
  require("../img/slide2.png"),
  require("../img/slide3.png"),
];

export default function Home({ onPickSpecialist }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.mainButton} onPress={onPickSpecialist}>
        <Text style={styles.mainButtonText}>Підібрати спеціаліста</Text>
      </TouchableOpacity>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.bannerContainer}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {bannerImages.map((img, i) => (
          <Image
            key={i}
            source={img}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  mainButton: {
    backgroundColor: "#6C63FF",
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 30,
    alignItems: "center",
    shadowColor: "#6C63FF",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  mainButtonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  bannerContainer: { height: 190 },
  bannerImage: {
    width: width - 60,
    height: 190,
    borderRadius: 15,
    marginRight: 15,
    backgroundColor: "#ddd",
  },
});
