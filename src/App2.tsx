import { useEffect, useState, useRef } from "react"

const getLocation = (cb: any) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(e => cb(e.coords.latitude, e.coords.longitude));
  } else {
    console.log("Geo Location not supported by browser");
  }
};

function useInterval(callback: any, delay: number) {
  const intervalRef = useRef<null | number>(null);
  const savedCallback = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === 'number') {
      intervalRef.current = window.setInterval(tick, delay);
      return () => {
        if(intervalRef.current) {
          window.clearInterval(intervalRef.current)
        }
      };
    }
  }, [delay]);
  return intervalRef;
}

export const App2 = () => {
  useInterval(() => {
    getLocation((latitude: number, longitude: number) => {
      setCoords(coordsState => [...coordsState,{latitude, longitude} ])
    })
  }, 5000)
  const [coords, setCoords] = useState<{latitude: number; longitude: number}[]>([])
  
  useEffect(() => {
    getLocation((latitude: number, longitude: number) => {
      console.log('adding location')
      setCoords(coordsState => [...coordsState,{latitude, longitude} ])
    })
  }, [])

  return <div>
    <h1>hello world</h1>
    <ul>
      {coords.map((coord, index) => {
        return <li key={index}>{coord.latitude} - {coord.longitude}</li>
      })}
    </ul>
  </div>
}