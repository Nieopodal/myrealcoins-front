import React, {useEffect, useState} from "react";
import {AllOperations} from "../../components/AllOperations/AllOperations";
import {Map} from "../../components/Map/Map";
import {showToast, Toast} from "../../utils/show-toast";
import {getCoords} from "../../utils/handlers/device-geolocation-handler";
import ThreeDots from "../../components/common/Loader";

interface UserGeolocation {
    lat: null | number;
    lon: null | number;
}

export const MapView = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [userGeolocation, setUserGeolocation] = useState<UserGeolocation>({
        lat: null,
        lon: null,
    });

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const {lat, lon} = await getCoords();
                setUserGeolocation({
                    lat: lat,
                    lon: lon,
                });
            } catch (e) {
                showToast(Toast.Error, (e as string));
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return <AllOperations onlyWithGps>
        {loading && <ThreeDots/>}
        {!loading && <>
            {userGeolocation && <Map centerLat={userGeolocation.lat} centerLon={userGeolocation.lon}/>}
        </>}
    </AllOperations>
};