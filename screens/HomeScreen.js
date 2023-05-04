import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";

const data = {
  featuredArt: [
    { id: 1, imageUrl: "https://example.com/image1.jpg" },
    { id: 2, imageUrl: "https://example.com/image2.jpg" },
    { id: 3, imageUrl: "https://example.com/image3.jpg" },
  ],
  artAttack: [
    { id: 4, imageUrl: "https://example.com/image4.jpg" },
    { id: 5, imageUrl: "https://example.com/image5.jpg" },
    { id: 6, imageUrl: "https://example.com/image6.jpg" },
  ],
  somethingNew: [
    { id: 7, imageUrl: "https://example.com/image7.jpg" },
    { id: 8, imageUrl: "https://example.com/image8.jpg" },
    { id: 9, imageUrl: "https://example.com/image9.jpg" },
  ],
};

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
        data={data.featuredArt}
        renderItem={renderCarouselItem}
        sliderWidth={300}
        itemWidth={250}
      />
      <View style={styles.reflection} />

      <Text style={styles.heading}>Art Attack</Text>
      <Carousel
        data={data.artAttack}
        renderItem={renderCarouselItem}
        sliderWidth={300}
        itemWidth={250}
      />
      <View style={styles.reflection} />

      <Text style={styles.heading}>Something New</Text>
      <Carousel
        data={data.somethingNew}
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
