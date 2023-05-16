import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA8DzASPQ36LC4-P5awnr0vxrmR0SXG6tw",
  authDomain: "pixtrix-6e370.firebaseapp.com",
  databaseURL: "https://pixtrix-6e370-default-rtdb.firebaseio.com",
  projectId: "pixtrix-6e370",
  storageBucket: "pixtrix-6e370.appspot.com",
  messagingSenderId: "205108642036",
  appId: "1:205108642036:web:9eb9ae53d22d2d76ff1ea1",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, firebaseConfig };
