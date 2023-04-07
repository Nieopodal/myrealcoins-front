import React, {useState} from "react";
import {BtnOutline} from "../common/BtnOutline";
import {DescriptionModal} from "./DescriptionModal";

interface Props {
    text: string
}

export const DescriptionBtn = ({text}: Props) => {
    const [openMap, setOpenMap] = useState<boolean>(false);

    const handleToggleMap = () => setOpenMap((prev) => !prev);

    return <>
        <BtnOutline
            btnDescription="Więcej"
            btnAction={handleToggleMap}
        />
        {openMap && <DescriptionModal
            text={text}
            open={openMap}
            handleToggle={handleToggleMap}/>
        }
    </>;
};