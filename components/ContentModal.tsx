import { useContext, useEffect, useRef, useState } from "react";
import { View, Modal, Image, Text, Pressable, StyleSheet } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { ContentContext } from "../store/context/content";

function ContentModal() {
  const { isModalShown, content, showModal } = useContext(ContentContext);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const videoRef = useRef(null);

  function handlePress() {
    setIsVideoPaused(!isVideoPaused);
  }

  function closeModal() {
    showModal(false);
  }

  useEffect(() => {
    // This stops the modal from showing on the first render,
    // given that no content has been chosen
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
          <Pressable onPress={handlePress} style={styles.media}>
            <Video
              ref={videoRef}
              source={{ uri: content.uri }}
              resizeMode={ResizeMode.CONTAIN}
              isMuted={true}
            />
          </Pressable>
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
