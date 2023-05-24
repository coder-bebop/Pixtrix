import { StyleSheet, FlatList, Pressable } from "react-native";
import { useState } from "react";
import AlbumCarousel from "../../components/AlbumCarousel";
import ContentModal from "../../components/ContentModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getProfileData } from "../../backend/readData";
import { ContentType, Data } from "../../constants/models/content";
import MainScreenHandler from "./MainScreenHandler";
import * as ImagePicker from "expo-image-picker";

function ProfileScreen() {
  const [carousels, setCarousels] = useState<Data[]>([]);

  function renderCarousel({ item, index }) {
    if (!item) {
      return;
    }

    return (
      <AlbumCarousel title={item.title} content={item.content} index={index} />
    );
  }

  async function addAlbum() {
    const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (canceled || !assets[0]) {
      return;
    }

    setCarousels((previousAlbums) => {
      const newAlbumIndex = previousAlbums.length + 1;

      const newAlbum = {
        title: `Album ${newAlbumIndex}`,
        content: [
          {
            type: assets[0]?.type as ContentType,
            uri: assets[0]?.uri,
          },
        ],
      };

      const updatedCarousels = [...previousAlbums, newAlbum];

      return updatedCarousels;
    });
  }

  return (
    <MainScreenHandler
      fetchDataCallback={getProfileData}
      setDataCallback={setCarousels}
    >
      <FlatList
        data={carousels}
        renderItem={renderCarousel}
        keyExtractor={({ title }) => title}
      />
      <Pressable
        onPress={addAlbum}
        style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}
      >
        <Ionicons name="add" size={38} color="white" />
      </Pressable>
      <ContentModal />
    </MainScreenHandler>
  );
}

const styles = StyleSheet.create({
  addButton: {
    alignSelf: "flex-end",
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    flex: 0,
  },
  pressed: {
    opacity: 0.65,
  },
});

export default ProfileScreen;
