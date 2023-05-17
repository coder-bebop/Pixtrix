import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { useEffect, useState } from "react";
import AlbumCarousel from "../../components/AlbumCarousel";
import ContentModal from "../../components/ContentModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getProfileData } from "../../backend/readData";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Data } from "../../constants/models/content";
import { POLLING_TIME } from "../../constants/values";

function ProfileScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Data[]>([]);

  function renderCarousel({ item }) {
    return <AlbumCarousel title={item.title} content={item.content} />;
  }

  function addAlbum(newAlbum) {
    //setData((previousAlbums) => [...previousAlbums, newAlbum]);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      retrieveData();
    }, POLLING_TIME);

    async function retrieveData() {
      const profileData = await getProfileData();
      if (profileData.length !== 0) {
        setData(profileData);
        setIsLoading(false);
        clearInterval(intervalId);
      }
    }

    retrieveData();

    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.screen}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
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
