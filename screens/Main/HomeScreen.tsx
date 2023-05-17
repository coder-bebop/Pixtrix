import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { getFeaturedData } from "../../backend/readData";
import FeatureCarousel from "../../components/FeatureCarousel";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Data } from "../../constants/models/content";

function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Data[]>([]);

  function renderCarousel({ item }) {
    return <FeatureCarousel title={item.title} content={item.content} />;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      retrieveData();
    }, 1000);

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
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default HomeScreen;
