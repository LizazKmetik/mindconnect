import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

export default function Home({ onPickSpecialist }) {
  const yogaImage = require("../img/yoga.png");
  const doctorImage = require("../img/doctor.png");

  const banners = [
    require("../img/slide1.png"),
    require("../img/slide2.png"),
    require("../img/slide3.png"),
  ];

  return (
    <View style={styles.container}>
      <Image source={yogaImage} style={styles.yoga} resizeMode="contain" />

      <View style={styles.centeredWrapper}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.bannerContainer}
          contentContainerStyle={{ alignItems: "center" }}
        >
          {banners.map((img, i) => (
            <Image
              key={i}
              source={img}
              style={[
                styles.bannerImage,
                i === banners.length - 1 && { marginRight: 0 },
              ]}
              resizeMode="contain"
            />
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.button} onPress={onPickSpecialist}>
          <Text style={styles.buttonText}>Підібрати спеціаліста</Text>
        </TouchableOpacity>
      </View>

      <Image source={doctorImage} style={styles.doctor} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    position: "relative",
    backgroundColor: "#e4daf7",
  },
  yoga: {
    position: "absolute",
    top: 30,
    left: 10,
    width: 100,
    height: 100,
    opacity: 0.9,
    zIndex: 10,
  },
  doctor: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 120,
    height: 120,
    opacity: 0.9,
    zIndex: 10,
  },
  centeredWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 130,
    marginBottom: 250,
  },
  button: {
    backgroundColor: "#6C63FF",
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  bannerContainer: {},
  bannerImage: {
    width: width - 40,
    aspectRatio: 16 / 9,
    borderRadius: 14,
    marginRight: 15,
  },
});
