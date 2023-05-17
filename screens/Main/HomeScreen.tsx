import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { getFeaturedData } from "../../backend/readData";
import ContentModal from "../../components/ContentModal";
import FeatureCarousel from "../../components/FeatureCarousel";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Data } from "../../constants/models/content";
import { POLLING_TIME } from "../../constants/values";

function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Data[]>([]);

  function renderCarousel({ item }) {
    return <FeatureCarousel title={item.title} content={item.content} />;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      retrieveData();
    }, POLLING_TIME);

    async function retrieveData() {
      const featuredData = await getFeaturedData();
      if (featuredData.length !== 0) {
        setData(featuredData);
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
