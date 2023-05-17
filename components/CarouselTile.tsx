import { useContext } from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import Thumbnail from "react-native-video";
import { ContentType } from "../constants/models/content";
import { ContentContext } from "../store/context/content";

function CarouselTile({ type, uri, style }) {
  const { changeContent } = useContext(ContentContext);

  function onPressChangeContent() {
    changeContent(type, uri);
  }

  return (
    <Pressable
      onPress={onPressChangeContent}
      style={({ pressed }) => [style, pressed && styles.pressed]}
    >
      {type === ContentType.Image && (
        <Image style={styles.image} source={{ uri: uri }} />
      )}
      {type === ContentType.Video && (
        <Thumbnail style={styles.image} source={{ uri: uri }}>
          <Text>00:00</Text>
        </Thumbnail>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    resizeMode: "contain",
  },
  pressed: {
    opacity: 0.65,
  },
});

export default CarouselTile;
