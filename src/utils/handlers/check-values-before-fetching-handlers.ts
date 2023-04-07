import { LocalizationSource, OperationType } from "types";

export const checkAmountSign = (amount: number, operationType: OperationType): number => {
    if (operationType === OperationType.AddToBudget ||
        operationType === OperationType.AddFromSavings ||
        operationType === OperationType.AddFromCushion
    ) return amount;
    else return amount * -1;
};

export const checkOperationType = (type: string, otherType: string): number => {
    return Number(type) === 9 ? Number(otherType) : Number(type);
};

export const isPayment = (type: string): boolean => Number(type) === OperationType.Payment;

interface CheckLocalization {
    latFromForm: number | null;
    lonFromForm: number | null;
}

export const checkLocalization = (localization: boolean, localizationSource: LocalizationSource, latFromDevice: number, lonFromDevice: number, latFromImage: number, lonFromImage: number): CheckLocalization => {

    if (localization) {
        if (Number(localizationSource) === LocalizationSource.UserDevice) {
            return {
                latFromForm: latFromDevice,
                lonFromForm: lonFromDevice,
            }
        }

        if (Number(localizationSource) === LocalizationSource.Receipt) {
            return {
                latFromForm: latFromImage,
                lonFromForm: lonFromImage,
            }
        }
    }
    return {
        latFromForm: null,
        lonFromForm: null,
    };
};