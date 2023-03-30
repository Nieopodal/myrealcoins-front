import React, {useState} from "react";
import { OperationEntity } from "types";
import {MapModal} from "./MapModal";
import {BtnOutline} from "../common/BtnOutline";

interface Props {
    operation: OperationEntity;
}

export const OperationMap = ({operation}: Props) => {
    const [openMap, setOpenMap] = useState<boolean>(false);

    const handleToggleMap= () => setOpenMap((prev) => !prev);

    return <>
        <BtnOutline
            btnDescription="Lokalizacja"
            btnAction={handleToggleMap}
        />
        {openMap &&  <MapModal operation={operation} open={openMap} handleToggle={handleToggleMap}/>}
    </>;
};