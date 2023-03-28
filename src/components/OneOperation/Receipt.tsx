import {BtnOutline} from "../common/BtnOutline";
import React, {useState} from "react";
import {ReceiptModal} from "./ReceiptModal";

interface Props {
    operationId: string;
}

export const Receipt = ({operationId}: Props) => {
    const [openReceipt, setOpenReceipt] = useState(false);
    const handleToggleReceiptModal = () => setOpenReceipt((prev) => !prev);
    return<>
        {openReceipt &&
            <ReceiptModal operationId={operationId!} handleToggle={handleToggleReceiptModal} open={openReceipt}/>}

        <BtnOutline
            btnAction={handleToggleReceiptModal} btnDescription="Wyświetl"/>
    </>
};