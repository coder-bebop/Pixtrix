import { useState } from "react";
import { FlatList } from "react-native";
import { getFeaturedData } from "../../backend/readData";
import ContentModal from "../../components/ContentModal";
import FeatureCarousel from "../../components/FeatureCarousel";
import { Data } from "../../constants/models/content";
import MainScreenHandler from "./MainScreenHandler";

function HomeScreen() {
  const [data, setData] = useState<Data[]>([]);

  function renderCarousel({ item }) {
    return <FeatureCarousel title={item.title} content={item.content} />;
  }

  return (
    <MainScreenHandler
      fetchDataCallback={getFeaturedData}
      setDataCallback={setData}
    >
      <FlatList
        data={data}
        renderItem={renderCarousel}
        keyExtractor={({ title }) => title}
      />
      <ContentModal />
    </MainScreenHandler>
  );
}

export default HomeScreen;
