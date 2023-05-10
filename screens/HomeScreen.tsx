import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";
import DATA from "../constants/dummyData/HomeData";

function HomeScreen() {
  const renderCarouselItem = ({ item }) => {
    return (
      <View style={styles.carouselItemContainer}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.carouselItemImage}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Featured Art</Text>
      <Carousel
        data={DATA.trending}
        renderItem={renderCarouselItem}
        sliderWidth={300}
        itemWidth={250}
      />
      <View style={styles.reflection} />

      <Text style={styles.heading}>Art Attack</Text>
      <Carousel
        data={DATA.artAttack}
        renderItem={renderCarouselItem}
        sliderWidth={300}
        itemWidth={250}
      />
      <View style={styles.reflection} />

      <Text style={styles.heading}>Something New</Text>
      <Carousel
        data={DATA.somethingNew}
        renderItem={renderCarouselItem}
        sliderWidth={300}
        itemWidth={250}
      />
      <View style={styles.reflection} />
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
});

export default HomeScreen;
