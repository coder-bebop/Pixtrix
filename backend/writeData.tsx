import { push, ref, set } from "firebase/database";
import { WriteMode } from "../constants/models/content";
import { database } from "./firebase";

const getRef = (endpoint: string) => ref(database, endpoint);

function writeData(mode: WriteMode, endpoint: string, data?) {
  try {
    const databaseRef = getRef(endpoint);

    switch (mode) {
      case WriteMode.Overwrite:
        set(databaseRef, data);
      case WriteMode.Add:
        return push(databaseRef, data);
    }
  } catch (error) {
    console.error(error);
  }
}

function overwriteData(endpoint: string, data?) {
  return writeData(WriteMode.Overwrite, endpoint, data);
}

function addData(endpoint: string, data?) {
  return writeData(WriteMode.Add, endpoint, data);
}

export { getRef, overwriteData, addData };
