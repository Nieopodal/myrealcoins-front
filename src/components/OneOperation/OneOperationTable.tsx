import {DetailsTableRow} from "./DetailsTableRow";
import {decodeOperationType} from "../../utils/decode-operation-type";
import {decodeOperationSubtype, decodePaymentType} from "../../utils/decode-payment-type";
import {pricifyHandler} from "../../utils/pricify-handler";
import {Receipt} from "./Receipt";
import {EditOperation} from "./EditOperation";
import {DeleteOperation} from "./DeleteOperation";
import React from "react";
import {OperationEntity, OperationType, PaymentCategory, PaymentSubcategory} from "types";
import {OperationMap} from "./OperationMap";

interface Props {
    operation: OperationEntity;
    color: string;
    handleSetReload: () => void;
}

export const OneOperationTable = ({operation, color, handleSetReload}: Props) => {
    return <div>
        {operation.isRepetitive && !operation.originId &&
            <h4 className="mx-auto w-fit font-bold text-red-600">Uwaga: to jest widok schematu</h4>}
        <table className="table table-zebra w-full pb-0">

            <tbody>
            <DetailsTableRow title="Typ">
                {decodeOperationType(operation.type)}
            </DetailsTableRow>
            {operation.type === OperationType.Payment && color &&
                <DetailsTableRow title="Kategoria">
                                    <span
                                        className={`${color}`}>{decodePaymentType(operation.category as PaymentCategory)}: {
                                        decodeOperationSubtype(operation.category as PaymentCategory, operation.subcategory as PaymentSubcategory)}
                                    </span>
                </DetailsTableRow>
            }
            <DetailsTableRow title="Opis">
                <span>{operation.description!.length > 0 ? operation.description : 'brak'}</span>
            </DetailsTableRow>

            <DetailsTableRow title="Kwota">
                <span>{pricifyHandler(operation.amount)} PLN</span>
            </DetailsTableRow>

            <DetailsTableRow title="Data i czas">
                {operation.createdAt}
            </DetailsTableRow>

            <DetailsTableRow title="Cykliczność">
                {operation.isRepetitive ? `tak` : `nie`}
            </DetailsTableRow>

            <DetailsTableRow title="Paragon">
                {operation.imgUrl ? <Receipt operationId={operation.id}/> : `brak`}
            </DetailsTableRow>

            <DetailsTableRow title="Lokalizacja">
                {(operation.lat && operation.lon) ? <OperationMap operation={operation}/> : `brak`}
            </DetailsTableRow>

            <DetailsTableRow title="Akcje">
                {!operation.originId && <div>
                    <EditOperation operationId={operation.id}
                                   handleSetReload={handleSetReload}/>
                    &nbsp;

                    <DeleteOperation operationId={operation.id}/>
                </div>
                }

                {operation.originId && <div>

                    <EditOperation operationId={operation.id}
                                   handleSetReload={handleSetReload}
                                   originId={operation.originId}/>
                    &nbsp;
                    <DeleteOperation operationId={operation.id} originId={operation.originId}/>
                </div>
                }
            </DetailsTableRow>

            </tbody>
        </table>
    </div>
};