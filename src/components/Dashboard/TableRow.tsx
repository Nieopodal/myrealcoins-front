import {OperationEntity, OperationType, PaymentCategory, PaymentSubcategory} from "types";
import {decodeOperationType} from "../../utils/decode-operation-type";
import {encodeOperationSubtype} from "../../utils/decode-payment-type";
import {pricifyHandler} from "../../utils/pricify-handler";

interface Props {
    operation: OperationEntity;
}

export const TableRow = ({operation}: Props) => {

    return <tr className="w-full border-[1px] my-2 max-h-28 content-evenly">

        <td className="flex items-center w-full text-xs py-0 h-10">{operation.createdAt}
        </td>
        <td className="flex items-center w-full h-8  py-0 text-lg justify-between">
            <div className="uppercase text-bold">
                <a href={`http://localhost:3001/operation/${operation.id}`}>
                    <div className="tooltip tooltip-right" data-tip="szczegóły">
                        <span className="underline">{decodeOperationType(operation.type)}</span>
                    </div>
                </a>
            </div>
            <div>{operation.isRepetitive &&
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-4 h-4 inline-block mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
                </svg>}{pricifyHandler(operation.amount)} PLN
            </div>
        </td>
        <td className="flex items-center w-full h-10 text-sm pb-6">{operation.type === OperationType.Payment &&

            <span
                className="flex text:sm lowercase font-semibold mr-1">{encodeOperationSubtype(operation.category as PaymentCategory, operation.subcategory as PaymentSubcategory)}</span>}
            {operation.description && <span>opis: {operation.description}</span>}
        </td>
    </tr>
};