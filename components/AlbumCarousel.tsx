import { useRef, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import AlbumTile from "./AlbumTile";

const { width: viewportWidth } = Dimensions.get("window");

function AlbumCarousel({ title, content }) {
  const [selectedItem, setSelectedItem] = useState(-1);

  function renderTile({ item, index }) {
    return (
      <AlbumTile
        type={item.type}
        uri={item.uri}
        isSelected={selectedItem === index}
      />
    );
  }

  function snapToItem(index) {
    setSelectedItem(index);
  }

  return (
    <View style={styles.carouselContainer}>
      <Text style={styles.title}>{title}</Text>
      <Carousel
        data={content}
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
});

export default AlbumCarousel;
