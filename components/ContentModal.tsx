import { useContext, useEffect, useRef, useState } from "react";
import { View, Modal, Image, Text, Pressable, StyleSheet } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { ContentContext } from "../store/context/content";
import { ContentType } from "../constants/models/content";

function ContentModal() {
  const [playbackStatus, setPlaybackStatus] = useState(null);
  const { content, showModal, setShowModal } = useContext(ContentContext);
  const videoRef = useRef(null);

  function togglePlayback() {
    // In the case that playbackStatus returns as an
    // AVPlaybackStatusError rather than a AVPlaybackStatusSuccess
    if (playbackStatus.isPlaying === undefined) {
      return;
    }

    const video = videoRef.current as Video;

    playbackStatus.isPlaying ? video.pauseAsync() : video.playAsync();
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <Modal animationType="slide" visible={showModal} transparent={true}>
      <View style={styles.container}>
        {content.type === ContentType.Image && (
          <Image
            source={{ uri: content.uri }}
            resizeMode="contain"
            style={styles.media}
          />
        )}
        {content.type === ContentType.Video && (
          <Pressable onPress={togglePlayback} style={styles.media}>
            <Video
              ref={videoRef}
              source={{ uri: content.uri }}
              isMuted={true}
              resizeMode={ResizeMode.CONTAIN}
              onPlaybackStatusUpdate={(status) => setPlaybackStatus(status)}
              style={styles.media}
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
