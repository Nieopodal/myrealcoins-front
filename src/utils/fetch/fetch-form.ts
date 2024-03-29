import {FieldValues} from "react-hook-form";
import {ApiResponse} from "types";
import {
    checkAmountSign,
    checkLocalization,
    checkOperationType,
    isPayment
} from "../handlers/check-values-before-fetching-handlers";
import {fetchHandler} from "./fetch-handler";
import {apiUrl} from "../../config/api";
import {showToast, Toast} from "../show-toast";
import {getCoords} from "../handlers/device-geolocation-handler";

export const fetchForm = async (inputData: FieldValues, editForm: boolean, editedOperationId?: string) => {
    if (inputData.localization === true && (inputData.localizationSource === "1" )) {
        if (inputData.latFromDevice === 0 && inputData.lonFromDevice === 0) {
            try {
                const {lat, lon} = await getCoords();
                inputData.latFromDevice = lat;
                inputData.lonFromDevice = lon;
            } catch(e) {
                showToast(Toast.Error, (e as string));
            }
        }
    }

    if (editForm) {
        const inputDataObj = {
            description: inputData.description,
            amount: checkAmountSign(inputData.amount, checkOperationType(inputData.type, inputData.otherType)),
            category: isPayment(inputData.type) ? Number(inputData.category[0]) : null,
            subcategory: isPayment(inputData.type) ? Number(inputData.category[2]) : null,
        };

        try {
            const res = await fetchHandler(`${apiUrl}/operation/${editedOperationId}`, "PUT", inputDataObj, true, "application/json");
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
            inputData.lonFromImage,
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

            const res = await fetchHandler(`${apiUrl}/operation${inputData.isRepetitive ? `/repetitive-operation` : `/`}`, "POST", formData, false);
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