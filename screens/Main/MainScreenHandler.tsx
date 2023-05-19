import { useEffect, useState } from "react";
import { View } from "react-native";
import LoadingSpinner from "../../components/LoadingSpinner";
import { POLLING_TIME } from "../../constants/values";

function MainScreenHandler({ fetchDataCallback, setDataCallback, children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getData();
    }, POLLING_TIME);

    async function getData() {
      const featuredData = await fetchDataCallback();
      if (featuredData.length !== 0) {
        setDataCallback(featuredData);
        setIsLoading(false);
        clearInterval(intervalId);
      }
    }

    getData();

    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <View style={{ flex: 1, paddingTop: 10 }}>{children}</View>;
}

export default MainScreenHandler;
