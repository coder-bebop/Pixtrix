import React, { useState } from "react";
import {
  View,
  Modal,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Video from "react-native-video";

function ContentModal({ visible, onRequestClose, media }) {
  const [isVideoPaused, setIsVideoPaused] = useState(false);

  function handleDoubleTap(evt) {
    const doubleTapSlop = 6;
    const isDoubleTapLeft = evt.nativeEvent.locationX < doubleTapSlop;
    const isDoubleTapRight =
      evt.nativeEvent.locationX > evt.nativeEvent.pageX - doubleTapSlop;

    if (isDoubleTapLeft) {
      media.seek(media.currentTime - 10);
    } else if (isDoubleTapRight) {
      media.seek(media.currentTime + 10);
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.container}>
        {media.type === "image" && (
          <Image
            source={{ uri: media.uri }}
            style={styles.media}
            resizeMode="contain"
          />
        )}
        {media.type === "video" && (
          <TouchableOpacity
            onPress={() => setIsVideoPaused(!isVideoPaused)}
            onDoubleTap={handleDoubleTap}
            style={styles.media}
          >
            <Video
              source={{ uri: media.uri }}
              style={styles.media}
              resizeMode="contain"
              paused={isVideoPaused}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onRequestClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  media: {
    width: "100%",
    height: "80%",
  },
  closeButton: {
    backgroundColor: "white",
    width: "100%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ContentModal;
