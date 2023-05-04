import React from "react";
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

const CATEGORIES = [
  {
    id: "1",
    title: "Anime",
    image: "https://i.imgur.com/1A4QW7b.jpg",
  },
  {
    id: "2",
    title: "Old School",
    image: "https://i.imgur.com/rMPrYfj.jpg",
  },
  {
    id: "3",
    title: "Retro",
    image: "https://i.imgur.com/Y7A7Pnf.jpg",
  },
  {
    id: "4",
    title: "Sketches",
    image: "https://i.imgur.com/m8ahv8s.jpg",
  },
  {
    id: "5",
    title: "Digital Art",
    image: "https://i.imgur.com/9El3t8h.jpg",
  },
  {
    id: "6",
    title: "Fantasy",
    image: "https://i.imgur.com/xgRzyb5.jpg",
  },
  {
    id: "7",
    title: "Sci-Fi",
    image: "https://i.imgur.com/88f7d8s.jpg",
  },
  {
    id: "8",
    title: "Comics",
    image: "https://i.imgur.com/VsW6Zdj.jpg",
  },
];

const numColumns = 2;
const WIDTH = Dimensions.get("window").width;
const itemWidth = (WIDTH - 20) / numColumns;
const itemHeight = itemWidth * 1.2;

function SearchScreen() {
  const renderCategory = ({ item }) => (
    <Pressable
      style={({ pressed }) => [styles.itemContainer, pressed && styles.pressed]}
    >
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <Text style={styles.categoryTitle}>{item.title}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <TextInput style={styles.searchInput} placeholder="Search" />
      <FlatList
        data={CATEGORIES}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
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
    paddingTop: 20,
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
    opacity: 0.7,
  },
});

export default SearchScreen;
