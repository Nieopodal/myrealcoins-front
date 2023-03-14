import {ApiResponse, OperationType} from "types";
import {FieldValues} from "react-hook-form";

const checkAmountSign = (amount: number, operationType: OperationType): number => {
    if (operationType === OperationType.AddToBudget ||
        operationType === OperationType.AddFromSavings ||
        operationType === OperationType.AddFromCushion
    ) return amount;
    else return amount * -1;
};

const checkOperationType = (type: string, otherType: string): number => {
    return Number(type) === 9 ? Number(otherType) : Number(type);
};

const isPayment = (type: string): boolean => Number(type) === OperationType.Payment;
export const fetchForm = async (inputData: FieldValues): Promise<ApiResponse<string> | null> => {
    try {
        const res = await fetch(`http://localhost:3001/operation${inputData.isRepetitive ? `/repetitive-operation` : `/`}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: checkOperationType(inputData.type, inputData.otherType),
                description: inputData.description,
                isRepetitive: inputData.isRepetitive,
                amount: checkAmountSign(inputData.amount, checkOperationType(inputData.type, inputData.otherType)),
                category: isPayment(inputData.type) ? Number(inputData.category[0]) : undefined,
                subcategory: isPayment(inputData.type) ? Number(inputData.category[2]) : undefined,
                imgUrl: isPayment(inputData.type) ? 'jest' : undefined, //@TODO change when file uploading is ready!
                lat: isPayment(inputData.type) ? inputData.lat : undefined,
                lon: isPayment(inputData.type) ? inputData.lon : undefined,
            }),
        });

        const data: ApiResponse<string> = await res.json();

        if (data) {
            return data;
        } else {
            return null;
        }
    } catch (e) {
        return null;
    }
};