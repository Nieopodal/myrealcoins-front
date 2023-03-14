import {useEffect, useState} from "react";

export const useGeolocation = () => {
    const [lat, setLat] = useState<number | null>(null);
    const [lon, setLon] = useState<number | null>(null);
    const [geolocationError, setGeolocationError] = useState<string | null>(null);

   useEffect(() => {
       navigator.geolocation.watchPosition((position) => {
           setLat(position.coords.latitude);
           setLon(position.coords.longitude);
           },
           (error) => {
               switch (error.code) {
                   case error.PERMISSION_DENIED:
                       setGeolocationError("Lokalizacja zablokowana przez użytkownika.");
                       break;
                   case error.POSITION_UNAVAILABLE:
                       setGeolocationError("Lokalizacja jest niedostępna.");
                       break;
               }
           },
           {
               enableHighAccuracy: true,
               timeout: 5000,
           });
   });

   return [lat, lon, geolocationError];
}