import axios from "axios";
import { Data } from "../constants/models/content";

const BACKEND_URL = "https://pixtrix-6e370-default-rtdb.firebaseio.com";

async function getData(endpoint: string): Promise<Data[]> {
  try {
    const response = await axios.get(`${BACKEND_URL}/${endpoint}.json`);
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

export function getFeaturedData() {
  return getData("featured");
}

export function getCategoriesData() {
  return getData("categories");
}

export function getProfileData() {
  return getData("profile");
}
