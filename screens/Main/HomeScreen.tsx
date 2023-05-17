import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { getFeaturedData } from "../../backend/readData";
import FeatureCarousel from "../../components/FeatureCarousel";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Data } from "../../constants/models/content";

function HomeScreen() {
  const [data, setData] = useState<Data[]>([]);

  function renderCarousel({ item }) {
    return <FeatureCarousel title={item.title} content={item.content} />;
  }

  useEffect(() => {
    async function retrieveData() {
      const featuredData = await getFeaturedData();
      setData(featuredData);
    }

    retrieveData();
  }, []);

  if (data.length === 0) {
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
