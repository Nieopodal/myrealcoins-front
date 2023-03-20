import {useEffect, useState} from "react";
import {useFormContext} from "react-hook-form";
import { LocalizationSource } from "types";

export const useDeviceGeolocation = () => {
    const {getValues, watch} = useFormContext();
    const chosenLocalizationType = watch("localizationSource");
    const [lat, setLat] = useState<number | null>(null);
    const [lon, setLon] = useState<number | null>(null);
    const [deviceGeolocationError, setDeviceGeolocationError] = useState<string | null>(null);

   useEffect(() => {
       if (Number(getValues("localizationSource")) === LocalizationSource.UserDevice) {
           navigator.geolocation.watchPosition((position) => {
                   setLat(position.coords.latitude);
                   setLon(position.coords.longitude);
               },
               (error) => {
                   switch (error.code) {
                       case error.PERMISSION_DENIED:
                           setDeviceGeolocationError("Lokalizacja zablokowana przez użytkownika.");
                           break;
                       case error.POSITION_UNAVAILABLE:
                           setDeviceGeolocationError("Lokalizacja jest niedostępna.");
                           break;
                   }
               },
               {
                   enableHighAccuracy: true,
                   timeout: 5000,
               });
       }

   },[chosenLocalizationType]);

   return [lat, lon, deviceGeolocationError];
}