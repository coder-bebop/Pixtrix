import { useContext, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { ContentType } from "../constants/models/content";
import { ContentContext } from "../store/context/content";
import { getThumbnailAsync } from "expo-video-thumbnails";
import LoadingSpinner from "./LoadingSpinner";
import { THUMBNAIL_POLLING_TIME } from "../constants/values";

function CarouselTile({ type, uri, style }) {
  const [imageURI, setImageURI] = useState<string>(null);
  const { setContent, setShowModal } = useContext(ContentContext);

  function handleSetContent() {
    setContent(type, uri);
    setShowModal(true);
  }

  useEffect(() => {
    if (type === ContentType.Image) {
      setImageURI(uri);
    } else if (type === ContentType.Video) {
      const intervalId = setInterval(generateThumbnail, THUMBNAIL_POLLING_TIME);
      const cleanup = () => clearInterval(intervalId);

      async function generateThumbnail() {
        try {
          const response = await getThumbnailAsync(uri);

          if (response) {
            setImageURI(response?.uri);
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

  if (!imageURI) {
    return <LoadingSpinner />;
  }

  return (
    <View style={{ borderWidth: 0.1 }}>
      <Pressable
        onPress={handleSetContent}
        style={({ pressed }) => [style, pressed && styles.pressed]}
      >
        {imageURI && (
          <Image source={{ uri: imageURI }} style={styles.imageURI} />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  imageURI: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  pressed: {
    opacity: 0.65,
  },
});

export default CarouselTile;
