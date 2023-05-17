import { Data } from "../constants/models/content";
import { database } from "./firebase";
import { ref, onValue } from "firebase/database";
import { dataToArray } from "../utils/utils";

function readData(endpoint: string) {
  let data: Data[] = [];

  try {
    const databaseRef = ref(database, "/" + endpoint);

    function retrieveValues(snapshot) {
      const value = snapshot.val();
      data = dataToArray(value);
    }

    onValue(databaseRef, retrieveValues);
  } catch (error) {
    console.error(error);
  }

  return data;
}

function getFeaturedData() {
  return readData("featured");
}

function getCategoriesData() {
  return readData("categories");
}

function getProfileData() {
  return readData("profile");
}

export { getFeaturedData, getCategoriesData, getProfileData };
