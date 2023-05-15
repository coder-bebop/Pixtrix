import axios from "axios";

const BACKEND_URL = "https://pixtrix-6e370-default-rtdb.firebaseio.com";

export async function fetchFeaturedArt() {
  const { data } = await axios.get(BACKEND_URL + "/featured.json");

  for (const image in data) {
  }
}
