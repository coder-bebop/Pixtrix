import { Image, Pressable, Text, View, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";

function FeatureCarousel({ title, content }) {
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
    <View style={styles.container}>
      <Text style={styles.heading}>{title}</Text>
      <Carousel
        data={content}
        renderItem={renderItem}
        sliderWidth={400}
        itemWidth={300}
      />
      <View style={styles.reflection} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
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
  pressed: {
    opacity: 0.65,
  },
});

export default FeatureCarousel;
