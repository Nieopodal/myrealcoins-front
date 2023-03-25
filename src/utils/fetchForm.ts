import {ApiResponse} from "types";
import {FieldValues} from "react-hook-form";
import {
    checkAmountSign,
    checkLocalization,
    checkOperationType,
    isPayment
} from "./check-values-before-fetching-handlers";

export const fetchForm = async (inputData: FieldValues, editForm: boolean, editedOperationId?: string) => {
    if (editForm) {
        const inputDataObj = {
            description: inputData.description,
            amount: checkAmountSign(inputData.amount, checkOperationType(inputData.type, inputData.otherType)),
            category: isPayment(inputData.type) ? Number(inputData.category[0]) : null,
            subcategory: isPayment(inputData.type) ? Number(inputData.category[2]) : null,
        };
        console.log(inputDataObj);

        try {
            const res = await fetch(`http://localhost:3001/operation/${editedOperationId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputDataObj),
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
    } else {
        const {latFromForm, lonFromForm} = checkLocalization(
            inputData.localization,
            inputData.localizationSource,
            inputData.latFromDevice,
            inputData.lonFromDevice,
            inputData.latFromImage,
            inputData.lonFromImage
        );

        const inputDataObj = {
            type: checkOperationType(inputData.type, inputData.otherType),
            description: inputData.description,
            isRepetitive: inputData.isRepetitive,
            amount: checkAmountSign(inputData.amount, checkOperationType(inputData.type, inputData.otherType)),
            category: isPayment(inputData.type) ? Number(inputData.category[0]) : '',
            subcategory: isPayment(inputData.type) ? Number(inputData.category[2]) : '',
            lat: isPayment(inputData.type) ? (latFromForm ?? '') : '',
            lon: isPayment(inputData.type) ? (lonFromForm ?? '') : '',
        };

        try {
            const formData = new FormData();
            if (inputData.image[0]) {
                formData.append("image", inputData.image[0]);
            }

            for (const [key, value] of Object.entries(inputDataObj)) {
                formData.append(key, value);
            }

            const res = await fetch(`http://localhost:3001/operation${inputData.isRepetitive ? `/repetitive-operation` : `/`}`, {
                method: 'POST',
                headers: {},
                body: formData,
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
    }
};