import {useEffect, useState} from "react";
import {useFormContext} from "react-hook-form";
import {LocalizationSource} from "types";

export const useDeviceGeolocation = () => {
    const {getValues} = useFormContext();
    const [lat, setLat] = useState<number | null>(null);
    const [lon, setLon] = useState<number | null>(null);
    const [deviceGeolocationError, setDeviceGeolocationError] = useState<string | null>(null);

    const getUserLocalization = () => {
        navigator.geolocation.getCurrentPosition((position) => {
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
                    default: {
                        setDeviceGeolocationError("Lokalizacja jest niedostępna.");
                        break;
                    }
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
            });
    };

    useEffect(() => {
        if (Number(getValues("localizationSource")) === LocalizationSource.UserDevice) {
            getUserLocalization();
        }
    }, [getValues("localizationSource")]);

    return [lat, lon, deviceGeolocationError];
};