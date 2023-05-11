import { useContext } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Thumbnail from "react-native-video";
import { ContentType } from "../constants/models/content";
import { ContentContext } from "../store/content-context";

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");

function AlbumTile({ type, uri, isSelected }) {
  const { changeContent } = useContext(ContentContext);

  function onPressChangeContent() {
    changeContent(type, uri);
  }

  return (
    <Pressable onPress={onPressChangeContent}>
      <View style={isSelected ? styles.carouselItemBig : styles.carouselItem}>
        {type === ContentType.Image && (
          <Image style={styles.image} source={{ uri: uri }} />
        )}
        {type === ContentType.Video && (
          <Thumbnail style={styles.image} source={{ uri: uri }}>
            <Text>00:00</Text>
          </Thumbnail>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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

export default AlbumTile;
