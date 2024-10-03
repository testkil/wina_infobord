import React, { useEffect, useState } from "react";
import { DATA_ENDPOINT, DATA_REFRESH_INTERVAL_MINUTES } from "../config";

const preloadImage = (url) => {
  const img = new Image();
  img.src = url;
};

const DataContext = React.createContext();

// Context to provide data to the infoboard
// Will cache data to local storage and attempt re-fetch every 5 minutes

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isOfflineMode, setIsOfflineMode] = useState(true);

  const refreshData = async () => {
    console.log("Refreshing data", new Date());
    setLoading(true);
    fetch(DATA_ENDPOINT)
      .then((response) => {
        setIsOfflineMode(false);
        if (!response.ok) {
          console.error("Response not ok", response);
        }
        return response.json();
      })
      .then((data) => {
        // Cache images
        data.slides.forEach((slide) => preloadImage(slide.file));

        setData(data);
        setLoading(false);
        localStorage.setItem("data", JSON.stringify(data));
      })
      .catch((error) => {
        console.error("Failed to fetch data", error);
        setIsOfflineMode(true);
        setLoading(false);
      });
  };

  const setCursusKotState = (state) =>
    setData({ ...data, cursuskot_open: state });

  console.log(data);
  useEffect(() => {
    const localData = localStorage.getItem("data");
    if (localData) {
      setData(JSON.parse(localData));
      setLoading(false);
    }
    refreshData();
    // Interval to re-fetch data every 5 minutes
    const interval = setInterval(
      refreshData,
      DATA_REFRESH_INTERVAL_MINUTES * 60 * 1000
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <DataContext.Provider
      value={{ data, loading, isOfflineMode, refreshData, setCursusKotState }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useData = () => React.useContext(DataContext);

export default useData;
