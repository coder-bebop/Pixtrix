import { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { getFeaturedData } from "../../backend/readData";
import ContentModal from "../../components/ContentModal";
import FeatureCarousel from "../../components/FeatureCarousel";
import { Data } from "../../constants/models/content";
import MainHandler from "./MainHandler";

function HomeScreen() {
  const [data, setData] = useState<Data[]>([]);

  function renderCarousel({ item }) {
    return <FeatureCarousel title={item.title} content={item.content} />;
  }

  return (
    <View style={styles.screen}>
      <MainHandler
        fetchDataCallback={getFeaturedData}
        setDataCallback={setData}
      >
        <FlatList
          data={data}
          renderItem={renderCarousel}
          keyExtractor={({ title }) => title}
        />
      </MainHandler>
      <ContentModal />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default HomeScreen;
