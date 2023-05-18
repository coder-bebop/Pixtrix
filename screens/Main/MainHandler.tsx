import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { POLLING_TIME } from "../../constants/values";

function MainHandler({ fetchDataCallback, setDataCallback, children }) {
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

  return <>{children}</>;
}

export default MainHandler;
