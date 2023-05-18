import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Data } from "../../constants/models/content";
import { POLLING_TIME } from "../../constants/values";

function MainHandler({ fetchDataCallback, setDataCallback, children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      retrieveData();
    }, POLLING_TIME);

    async function retrieveData() {
      const featuredData = await fetchDataCallback();
      if (featuredData.length !== 0) {
        setDataCallback(featuredData);
        setIsLoading(false);
        clearInterval(intervalId);
      }
    }

    retrieveData();

    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}

export default MainHandler;
