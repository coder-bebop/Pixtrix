import { useContext, useEffect, useRef, useState } from "react";
import { View, Modal, Image, Text, Pressable, StyleSheet } from "react-native";
import Video from "react-native-video";
import { ContentContext } from "../store/context/content";
import DoubleTapPressable from "./DoubleTapPressable";

function ContentModal() {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { isModalShown, content, showModal } = useContext(ContentContext);
  const videoRef = useRef(null);

  function handlePress() {
    setIsVideoPlaying(!isVideoPlaying);
  }

  function handleDoubleTap(evt) {
    const video = videoRef.current;

    const doubleTapSlop = 6;
    const isDoubleTapLeft = evt.nativeEvent.locationX < doubleTapSlop;
    const isDoubleTapRight =
      evt.nativeEvent.locationX > evt.nativeEvent.pageX - doubleTapSlop;

    if (isDoubleTapLeft) {
      video.seek(video.currentTime - 10);
    } else if (isDoubleTapRight) {
      video.seek(video.currentTime + 10);
    }
  }

  function closeModal() {
    showModal(false);
  }

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

    showModal(true);
  }, [content]);

  return (
    <Modal animationType="slide" visible={isModalShown} transparent={true}>
      <View style={styles.container}>
        {content.type === "image" && (
          <Image
            source={{ uri: content.uri }}
            style={styles.media}
            resizeMode="contain"
          />
        )}
        {content.type === "video" && (
          <DoubleTapPressable
            onPress={handlePress}
            onDoubleTap={handleDoubleTap}
            style={styles.media}
          >
            <Video
              ref={videoRef}
              source={{ uri: content.uri }}
              style={styles.media}
              resizeMode="contain"
              paused={isVideoPlaying}
            />
          </DoubleTapPressable>
        )}
      </View>
      <Pressable
        onPress={closeModal}
        style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}
      >
        <Text style={styles.closeButtonText}>Close</Text>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: 400,
    height: 300,
  },
  media: {
    width: "100%",
    height: "100%",
    padding: "5%",
  },
  closeButton: {
    backgroundColor: "#E5E4E2",
    width: "100%",
    height: "7%",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.4,
  },
});

export default ContentModal;
