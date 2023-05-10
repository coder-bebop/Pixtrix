import { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Pressable,
  Animated,
} from "react-native";
import Carousel from "react-native-snap-carousel";

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");

function AlbumCarousel({ title, images, onSelectTile }) {
  const [selectedItem, setSelectedItem] = useState(-1);

  function renderTile({ item, index }) {
    const isSelected = selectedItem === index;

    return (
      <Pressable onPress={onSelectTile}>
        <View style={isSelected ? styles.carouselItemBig : styles.carouselItem}>
          <Image style={styles.image} source={{ uri: item }} />
        </View>
      </Pressable>
    );
  }

  function snapToItem(index) {
    setSelectedItem(index);
  }

  return (
    <View style={styles.carouselContainer}>
      <Text style={styles.title}>{title}</Text>
      <Carousel
        data={images}
        renderItem={renderTile}
        sliderWidth={viewportWidth}
        itemWidth={viewportWidth * 0.25}
        containerCustomStyle={styles.carousel}
        onSnapToItem={snapToItem}
        layout="default"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 10,
  },
  carousel: {
    flexGrow: 1,
    marginBottom: 10,
  },
  carouselItem: {
    backgroundColor: "white",
    borderRadius: 10,
    height: viewportHeight * 0.1,
    width: viewportWidth * 0.2,
    padding: 10,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  carouselItemBig: {
    backgroundColor: "white",
    borderRadius: 10,
    height: viewportHeight * 0.15,
    width: viewportWidth * 0.25,
    padding: 15,
    marginBottom: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    resizeMode: "contain",
  },
});

export default AlbumCarousel;
