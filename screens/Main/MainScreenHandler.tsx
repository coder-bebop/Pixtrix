import { useEffect, useState } from "react";
import { View } from "react-native";
import LoadingSpinner from "../../components/LoadingSpinner";
import { DATA_POLLING_TIME } from "../../constants/values";

function MainScreenHandler({ fetchDataCallback, setDataCallback, children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(getData, DATA_POLLING_TIME);
    const cleanup = () => clearInterval(intervalId);

    async function getData() {
      const featuredData = await fetchDataCallback();
      if (featuredData.length !== 0) {
        setDataCallback(featuredData.filter((item) => item));
        setIsLoading(false);
        cleanup();
      }
    }

    getData();

    return cleanup;
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <View style={{ flex: 1, paddingTop: 10 }}>{children}</View>;
}

export default MainScreenHandler;
