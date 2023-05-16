import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import FeatureCarousel from "../../components/FeatureCarousel";
import FEATURED from "../../constants/dummyData/HomeData";

function HomeScreen() {
  function renderCarousel({ item }) {
    return <FeatureCarousel title={item.title} content={item.content} />;
  }
  return (
    <View style={styles.screen}>
      <FlatList
        data={FEATURED}
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
