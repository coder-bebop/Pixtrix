import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { writeData } from "./backend/writeData";
import Navigation from "./components/Navigation";
import FEATURED from "./constants/dummyData/HomeData";
import CATEGORIES from "./constants/dummyData/SearchData";
import ALBUMS from "./constants/dummyData/ProfileData";

export default function App() {
  // DUMMY DATA
  useEffect(() => {
    writeData("featured", FEATURED);
    writeData("categories", CATEGORIES);
    writeData("profile", ALBUMS);
  }, []);

  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}>
        <Navigation />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
