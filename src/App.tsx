import React, { useEffect, useState } from "react";
import "./App.css";
const intervalWorker = new Worker("./service-worker.ts");

interface LocationInterace {
  longitude: number;
  latitude: number;
  date: string;
}

function App() {
  const [locations, setLocations] = useState<LocationInterace[]>([]);

  intervalWorker.onmessage = () => {
    console.log("onmessage");
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geo Location not supported by browser");
    }
  };

  const watchPosition = () => {
    navigator.geolocation.watchPosition((position) => {
      console.log("watchPosition ", position);
      showPosition(position);
    });
  };

  const showPosition = (position: any) => {
    console.log("showPosition ", position.coords);
    const date = new Date().toTimeString();
    const newLocation = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
      date,
    };
    setLocations((oldLocations) => [...oldLocations, newLocation]);
  };

  useEffect(() => {
    console.log("useEffect ");
    const interval = setInterval(() => {
      console.log("setInterval app.tsx");
      getLocation();
    }, 5000);
    watchPosition();
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
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
