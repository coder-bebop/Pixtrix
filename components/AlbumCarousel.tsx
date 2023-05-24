import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import Carousel from "react-native-snap-carousel";
import CarouselTile from "./CarouselTile";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { ContentType } from "../constants/models/content";

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");

function AlbumCarousel({ title, content }) {
  const [tiles, setTiles] = useState(content);

  function renderTile({ item }) {
    return (
      <CarouselTile
        type={item.type}
        uri={item.uri}
        style={styles.carouselItem}
      />
    );
  }

  async function addContent() {
    const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (canceled || !assets[0]) {
      return;
    }

    const newTile = {
      type: assets[0]?.type as ContentType,
      uri: assets[0]?.uri,
    };

    setTiles((previousTiles) => {
      const updatedCarousel = [...previousTiles, newTile];

      //overwriteData("profile/" + index + "/content", updatedCarousel);

      return updatedCarousel;
    });
  }

  return (
    <View style={styles.carouselContainer}>
      <Text style={styles.title}>{title}</Text>
      <Carousel
        data={tiles}
        renderItem={renderTile}
        containerCustomStyle={styles.carousel}
        sliderWidth={viewportWidth}
        itemWidth={viewportWidth * 0.38}
      />
      <Pressable onPress={addContent} style={styles.addButtonContainer}>
        <Ionicons name="add" size={16} color="gray" />
      </Pressable>
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
  addButtonContainer: {
    backgroundColor: "white",
    borderRadius: 20,
  },
});

export default AlbumCarousel;
