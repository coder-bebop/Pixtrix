import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { useContext, useEffect, useState } from "react";
import AlbumCarousel from "../../components/AlbumCarousel";
import ContentModal from "../../components/ContentModal";
import ALBUMS from "../../constants/dummyData/ProfileData";
import Ionicons from "@expo/vector-icons/Ionicons";
import ContentContextProvider, {
  ContentContext,
} from "../../store/content-context";

function ProfileScreen() {
  const [albums, setAlbums] = useState(ALBUMS);
  const { isModalShown, content, showModal } = useContext(ContentContext);

  function renderCarousel({ item }) {
    return <AlbumCarousel title={item.title} content={item.content} />;
  }

  function addAlbum(newAlbum) {
    setAlbums((previousAlbums) => [...previousAlbums, newAlbum]);
  }

  function onRequestClose() {
    showModal(false);
  }

  return (
    <View style={styles.screen}>
      <ContentContextProvider>
        <FlatList
          data={albums}
          renderItem={renderCarousel}
          keyExtractor={({ title }) => title}
        />
      </ContentContextProvider>
      <ContentModal
        visible={isModalShown}
        onRequestClose={onRequestClose}
        media={content}
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
