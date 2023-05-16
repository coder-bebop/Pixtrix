import axios from "axios";
import { Data } from "../constants/models/content";
import { firebaseConfig } from "./firebase";

async function getData(endpoint: string): Promise<Data[]> {
  try {
    const response = await axios.get(
      `${firebaseConfig.databaseURL}/${endpoint}.json`
    );
    const data = response?.data;

    const requestedData: Data[] = Object.keys(data).map((key) => ({
      title: data[key].title,
      content: data[key].content,
    }));

    return requestedData;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function getFeaturedData() {
  return getData("featured");
}

function getCategoriesData() {
  return getData("categories");
}

function getProfileData() {
  return getData("profile");
}

export { getFeaturedData, getCategoriesData, getProfileData };
