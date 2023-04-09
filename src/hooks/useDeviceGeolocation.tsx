import {useEffect, useState} from "react";
import {useFormContext} from "react-hook-form";
import {LocalizationSource} from "types";
import {getCoords} from "../utils/handlers/device-geolocation-handler";

export const useDeviceGeolocation = () => {
    const {getValues} = useFormContext();
    const [lat, setLat] = useState<number | null>(null);
    const [lon, setLon] = useState<number | null>(null);
    const [deviceGeolocationError, setDeviceGeolocationError] = useState<string | null>(null);

    useEffect(() => {
        if (Number(getValues("localizationSource")) === LocalizationSource.UserDevice) {
            (async () => {
                try {
                    const {lat, lon} = await getCoords();
                    setLat(lat);
                    setLon(lon);
                } catch(e){
                    setDeviceGeolocationError(e as string);
                }
            })();
        }
    }, [getValues("localizationSource")]);

    return [lat, lon, deviceGeolocationError];
};