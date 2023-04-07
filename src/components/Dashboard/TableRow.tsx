import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {OperationEntity, OperationType, PaymentCategory, PaymentSubcategory} from "types";
import {decodeOperationType} from "../../utils/decode-operation-type";
import {decodeOperationSubtype} from "../../utils/decode-payment-type";
import {pricifyHandler} from "../../utils/pricify-handler";
import {operationColorHandler} from "../../utils/operation-color-handler";
import {SuccessSvg} from "../common/Svg/SuccessSvg";
import {ErrorSvg} from "../common/Svg/ErrorSvg";
import {RepetitiveOperationSvg} from "../common/RepetitiveOperationSvg";

interface Props {
    operation: OperationEntity;
    isRestored?: boolean;
    restoreResult?: number;
}

export const TableRow = ({operation, isRestored, restoreResult}: Props) => {

    const [color, setColor] = useState('');

    useEffect(() => {
        const operationColor = operationColorHandler(operation);
        if (operationColor) setColor(operationColor);
    }, [operationColorHandler]);

    return <tr className="w-full border-[1px] my-2 max-h-28 content-evenly hover">
        <td>
            <NavLink to={isRestored ? '' : `/operation/${operation.id}`}>
                <div className="flex items-center w-full text-xs py-0 h-10">
                    {operation.createdAt}
                </div>
                <div className="flex items-center w-full h-8  py-0 text-lg justify-between">
                    <div className="uppercase text-bold">
                        {decodeOperationType(operation.type)}
                    </div>
                    <div>{operation.isRepetitive && <RepetitiveOperationSvg/>}
                        {pricifyHandler(operation.amount)} PLN

                        {restoreResult === 1 && <SuccessSvg/>}
                        {restoreResult === 0 && <ErrorSvg/>}
                    </div>
                </div>
                <div
                    className="flex items-center pt-1 w-full h-10 text-sm pb-6">
                    {operation.type === OperationType.Payment && <span
                            className={`flex ${color}`}>
                        {decodeOperationSubtype(operation.category as PaymentCategory, operation.subcategory as PaymentSubcategory).toUpperCase()}
                    </span>
                    }

                    {operation.description && <span>opis: {operation.description}</span>}
                </div>
            </NavLink>
        </td>
    </tr>
};