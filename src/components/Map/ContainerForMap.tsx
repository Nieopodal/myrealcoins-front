import {AllOperations} from "../AllOperations/AllOperations";
import {Map} from "./Map";
import React, {useEffect, useState} from "react";
import {showToast, Toast} from "../../utils/show-toast";

interface UserGeolocation {
    lat: null | number;
    lon: null | number;
}

export const ContainerForMap = () => {

    const [userGeolocation, setUserGeolocation] = useState<UserGeolocation>({
        lat: null,
        lon: null,
    });

    useEffect(() => {
        navigator.geolocation.watchPosition((position) => {
                setUserGeolocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                })
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        showToast(Toast.Error, "Lokalizacja zablokowana przez użytkownika.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        showToast(Toast.Error, "Lokalizacja jest niedostępna.");
                        break;
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
            });
    }, [userGeolocation]);

    return <AllOperations onlyWithGps>
        {userGeolocation && <Map centerLat={userGeolocation.lat} centerLon={userGeolocation.lon}/> }
    </AllOperations>
};