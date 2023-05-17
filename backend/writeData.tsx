import { push, ref, set } from "firebase/database";
import { database } from "./firebase";

const setRef = (endpoint: string) => ref(database, endpoint);

function writeData(mode: string, endpoint: string, data) {
  const databaseRef = setRef(endpoint);

  switch (mode) {
    case "overwrite":
      set(databaseRef, data);
      break;
    case "add":
      push(databaseRef, data);
      break;
  }
}

function overwriteData(endpoint: string, data) {
  writeData("overwrite", endpoint, data);
}

function addData(endpoint: string, data) {
  writeData("add", endpoint, data);
}

export { overwriteData, addData };
