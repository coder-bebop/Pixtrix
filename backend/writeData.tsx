import { ref, set } from "firebase/database";
import { database } from "./firebase";

function writeData(endpoint: string, data) {
  const databaseRef = ref(database, endpoint);
  set(databaseRef, data);
}

export { writeData };
