import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { useState } from "react";
import AlbumCarousel from "../../components/AlbumCarousel";
import ContentModal from "../../components/ContentModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getProfileData } from "../../backend/readData";
import { Data } from "../../constants/models/content";
import MainScreenHandler from "./MainScreenHandler";

function ProfileScreen() {
  const [data, setData] = useState<Data[]>([]);

  function renderCarousel({ item }) {
    return <AlbumCarousel title={item.title} content={item.content} />;
  }

  function addAlbum(newAlbum) {
    //setData((previousAlbums) => [...previousAlbums, newAlbum]);
  }

  return (
    <MainScreenHandler
      fetchDataCallback={getProfileData}
      setDataCallback={setData}
    >
      <FlatList
        data={data}
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
