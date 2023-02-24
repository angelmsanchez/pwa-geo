import React, { useEffect, useState } from "react";
import "./App.css";

interface LocationInterace {
  longitude: number;
  latitude: number;
  date: string;
}

function App() {
  const [locations, setLocations] = useState<LocationInterace[]>([]);
  const worker = new Worker(new URL("./my-worker.js", import.meta.url));

  const getLocation = (date: string) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        const newLocation = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          date,
        };
        setLocations((oldLocations) => [...oldLocations, newLocation]);
      });
    } else {
      console.log("Geo Location not supported by browser");
    }
  };

  useEffect(() => {
    worker.postMessage("start");
    worker.onmessage = function (event: any) {
      getLocation(event.data);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <h6>LOCATIONS</h6>
      {locations &&
        locations.map((location, index) => {
          return (
            <div key={index}>
              {location.date}: {location.latitude} {location.longitude}
            </div>
          );
        })}
    </div>
  );
}

export default App;
