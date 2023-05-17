import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { useContext, useEffect, useState } from "react";
import AlbumCarousel from "../../components/AlbumCarousel";
import ContentModal from "../../components/ContentModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import ContentContextProvider, {
  ContentContext,
} from "../../store/content-context";
import { getProfileData } from "../../backend/readData";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Data } from "../../constants/models/content";

function ProfileScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Data[]>([]);
  const { isModalShown, content, showModal } = useContext(ContentContext);

  function renderCarousel({ item }) {
    return <AlbumCarousel title={item.title} content={item.content} />;
  }

  function addAlbum(newAlbum) {
    //setAlbums((previousAlbums) => [...previousAlbums, newAlbum]);
  }

  function onRequestClose() {
    showModal(false);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      retrieveData();
    }, 1000);

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
      <ContentContextProvider>
        <FlatList
          data={data}
          renderItem={renderCarousel}
          keyExtractor={({ title }) => title}
        />
      </ContentContextProvider>
      <Pressable
        onPress={addAlbum}
        style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}
      >
        <Ionicons name="add" size={38} color="white" />
      </Pressable>
      <ContentModal
        visible={isModalShown}
        onRequestClose={onRequestClose}
        media={content}
      />
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
