import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";
import { getCategoriesData } from "../../backend/readData";
import LoadingSpinner from "../../components/LoadingSpinner";
import CATEGORIES from "../../constants/dummyData/SearchData";
import { Data } from "../../constants/models/content";

const numColumns = 2;
const WIDTH = Dimensions.get("window").width;
const itemWidth = (WIDTH - 20) / numColumns;
const itemHeight = itemWidth * 1.2;

function SearchScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Data[]>([]);

  function renderCategory({ item }) {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.itemContainer,
          pressed && styles.pressed,
        ]}
      >
        <Image source={{ uri: item.content }} style={styles.categoryImage} />
        <Text style={styles.categoryTitle}>{item.title}</Text>
      </Pressable>
    );
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      retrieveData();
    }, 1000);

    async function retrieveData() {
      const categoriesData = await getCategoriesData();
      if (categoriesData.length !== 0) {
        setData(categoriesData);
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
    <View style={styles.container}>
      <TextInput style={styles.searchInput} placeholder="Search" />
      <FlatList
        data={data}
        renderItem={renderCategory}
        keyExtractor={({ title }) => title}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.categoryList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  searchInput: {
    margin: 18,
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  categoryList: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
  itemContainer: {
    width: itemWidth,
    height: itemHeight,
    overflow: "hidden",
    padding: 7,
  },
  categoryImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 16,
  },
  categoryTitle: {
    position: "absolute",
    bottom: 10,
    left: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    padding: 5,
  },
  pressed: {
    opacity: 0.65,
  },
});

export default SearchScreen;
