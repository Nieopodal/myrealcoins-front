import {useContext} from "react";
import {MapContainer, TileLayer} from "react-leaflet";
import '../../utils/fix-map-icon';
import {AllOperationsContext} from "../../contexts/all-operations.context";
import {OneMarker} from "./OneMarker";
import 'leaflet/dist/leaflet.css';
import ThreeDots from "../common/Loader";

import './Map.css';

interface Props {
    centerLat?: number | null;
    centerLon?: number | null;
}

export const Map = ({centerLat, centerLon}: Props) => {
    const {operations, loading} = useContext(AllOperationsContext);

    return <div className="map">
        {loading && <ThreeDots/>}

        {!loading &&
            <MapContainer
                center={centerLat && centerLon ? [centerLat, centerLon] : [52.0403662, 19.9563874]}
                zoom={centerLat && centerLon ? 13 : 6}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {operations && operations.map(operation => <OneMarker operation={operation} key={operation.id}/>)}
            </MapContainer>
        }
    </div>
};