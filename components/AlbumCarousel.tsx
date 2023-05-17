import { StyleSheet, Text, View, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import CarouselTile from "./CarouselTile";

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");

function AlbumCarousel({ title, content }) {
  function renderTile({ item }) {
    return (
      <CarouselTile
        type={item.type}
        uri={item.uri}
        style={styles.carouselItem}
      />
    );
  }

  return (
    <View style={styles.carouselContainer}>
      <Text style={styles.title}>{title}</Text>
      <Carousel
        data={content}
        renderItem={renderTile}
        containerCustomStyle={styles.carousel}
        sliderWidth={viewportWidth}
        itemWidth={viewportWidth * 0.35}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 8,
  },
  carousel: {
    flexGrow: 1,
  },
  carouselItem: {
    backgroundColor: "white",
    borderRadius: 10,
    height: viewportHeight * 0.2,
    width: viewportWidth * 0.5,
    padding: 10,
    marginBottom: 30,
  },
});

export default AlbumCarousel;
