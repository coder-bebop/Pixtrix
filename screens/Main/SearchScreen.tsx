import { useState } from "react";
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
import { Data } from "../../constants/models/content";
import MainScreenHandler from "./MainScreenHandler";

const numColumns = 2;
const WIDTH = Dimensions.get("window").width;
const itemWidth = (WIDTH - 20) / numColumns;
const itemHeight = itemWidth * 1.2;

function SearchScreen() {
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

  return (
    <MainScreenHandler
      fetchDataCallback={getCategoriesData}
      setDataCallback={setData}
    >
      <TextInput style={styles.searchInput} placeholder="Search" />
      <FlatList
        data={data}
        renderItem={renderCategory}
        keyExtractor={({ title }) => title}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.categoryList}
      />
    </MainScreenHandler>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    margin: 18,
    padding: 10,
    backgroundColor: "#e0e0e0",
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
