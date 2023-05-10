import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { useState } from "react";
import AlbumCarousel from "../components/AlbumCarousel";
import ContentModal from "../components/ContentModal";
import ALBUMS from "../constants/dummyData/ProfileData";
import Ionicons from "@expo/vector-icons/Ionicons";

function ProfileScreen() {
  const [albums, setAlbums] = useState(ALBUMS);
  const [showModal, setShowModal] = useState(false);

  function renderAlbumCarousel({ item }) {
    return (
      <AlbumCarousel
        title={item.title}
        images={item.images}
        onSelectTile={showContent}
      />
    );
  }

  function addAlbum(newAlbum) {
    setAlbums((previousAlbums) => [...previousAlbums, newAlbum]);
  }

  function showContent() {}

  function closeModal() {}

  return (
    <View style={styles.screen}>
      <FlatList
        data={albums}
        renderItem={renderAlbumCarousel}
        keyExtractor={({ title }) => title}
      />
      <ContentModal
        visible={showModal}
        onRequestClose={closeModal}
        media={{ type: "image", uri: "https://example.com/image1.jpg" }}
      />
      <Pressable style={styles.addButton} onPress={addAlbum}>
        <Ionicons name="add" size={38} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  addButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
