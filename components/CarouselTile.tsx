import { useContext, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { ContentType } from "../constants/models/content";
import { ContentContext } from "../store/context/content";
import { getThumbnailAsync } from "expo-video-thumbnails";
import LoadingSpinner from "./LoadingSpinner";
import { THUMBNAIL_POLLING_TIME } from "../constants/values";

function CarouselTile({ type, uri, style }) {
  const [image, setImage] = useState<string>(null);
  const { changeContent } = useContext(ContentContext);

  function handleChangeContent() {
    changeContent(type, uri);
  }

  useEffect(() => {
    if (type === ContentType.Image) {
      setImage(uri);
    } else if (type === ContentType.Video) {
      const intervalId = setInterval(generateThumbnail, THUMBNAIL_POLLING_TIME);
      const cleanup = () => clearInterval(intervalId);

      async function generateThumbnail() {
        try {
          const response = await getThumbnailAsync(uri);

          if (response) {
            setImage(response?.uri);
            cleanup();
          }
        } catch (e) {
          console.warn(e);
        }
      }

      generateThumbnail();

      return cleanup;
    }
  }, []);

  if (!image) {
    return <LoadingSpinner />;
  }

  return (
    <View style={{ borderWidth: 0.1 }}>
      <Pressable
        onPress={handleChangeContent}
        style={({ pressed }) => [style, pressed && styles.pressed]}
      >
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  pressed: {
    opacity: 0.65,
  },
});

export default CarouselTile;
