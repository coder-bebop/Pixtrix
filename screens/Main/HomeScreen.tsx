import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import Carousel from "react-native-snap-carousel";
import FEATURED_DATA from "../../constants/dummyData/HomeData";

function HomeScreen() {
  function FeatureCarousel({ data }) {
    function renderItem({ item }) {
      return (
        <Pressable
          style={({ pressed }) => [
            styles.carouselItemContainer,
            pressed && styles.pressed,
          ]}
        >
          <Image source={{ uri: item }} style={styles.carouselItemImage} />
        </Pressable>
      );
    }
    return (
      <>
        <Text style={styles.heading}>{data.title}</Text>
        <Carousel
          data={data.content}
          renderItem={renderItem}
          sliderWidth={300}
          itemWidth={250}
        />
        <View style={styles.reflection} />
      </>
    );
  }

  return (
    <View style={styles.container}>
      <FeatureCarousel data={FEATURED_DATA[0]} />
      <FeatureCarousel data={FEATURED_DATA[1]} />
      <FeatureCarousel data={FEATURED_DATA[2]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  carouselItemContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "white",
    height: 200,
  },
  carouselItemPressable: {
    height: "100%",
    width: "100%",
  },
  carouselItemImage: {
    height: 150,
    width: 200,
    resizeMode: "contain",
  },
  reflection: {
    width: 250,
    height: 20,
    backgroundColor: "gray",
    opacity: 0.2,
    marginVertical: 10,
  },
  pressed: {
    opacity: 0.65,
  },
});

export default HomeScreen;
