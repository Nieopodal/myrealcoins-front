import React, {useState} from "react";
import {Marker, Popup} from "react-leaflet";
import {OperationEntity, PaymentCategory, PaymentSubcategory} from "types";
import {decodeOperationType} from "../../utils/decode-operation-type";
import {decodeOperationSubtype, decodePaymentType} from "../../utils/decode-payment-type";
import {operationColorHandler} from "../../utils/operation-color-handler";
import {pricifyHandler} from "../../utils/pricify-handler";
import {BtnOutline} from "../common/BtnOutline";
import {ReceiptModal} from "../OneOperation/ReceiptModal";

interface Props {
    operation: OperationEntity;
}

export const OneMarker = ({operation}: Props) => {

    const {lat, lon, type, category, subcategory, amount, id, description, imgUrl} = operation;

    const [openReceipt, setOpenReceipt] = useState(false);
    const handleToggleReceiptModal = () => setOpenReceipt((prev) => !prev);

    if (lat && lon) return <>
        {openReceipt &&
            <ReceiptModal operationId={id!} handleToggle={handleToggleReceiptModal} open={openReceipt}/>}
        <Marker position={[lat, lon]}>
            <Popup>
                <h2 className="font-semibold text-xl">{decodeOperationType(type)}</h2>
                <div
                    className={`${operationColorHandler(operation)} mt-2 w-fit mx-auto text-sm whitespace-normal h-fit`}>
                    {decodePaymentType(category as PaymentCategory)}
                    :
                    {decodeOperationSubtype(category as PaymentCategory, subcategory as PaymentSubcategory)}
                </div>

                <div
                    className="pt-2">
                    <strong>Kwota:</strong> {pricifyHandler(amount)} PLN
                </div>

                {description && <div className="pt-2"><strong>Opis</strong>: {description}</div>}

                {imgUrl &&
                    <span className="mr-1">
                        <BtnOutline
                            btnAction={handleToggleReceiptModal} btnDescription="Paragon"/>
                    </span>
                }

                <a href={`/operation/${id}`}
                   className='btn btn-outline btn-xs text-sm rounded-btn text-xs xl:text-sm mx-auto sm:mx-0 w-fit sm:w-auto mt-2'>
                    Szczegóły
                </a>
            </Popup>
        </Marker>
    </>

    return null;
};