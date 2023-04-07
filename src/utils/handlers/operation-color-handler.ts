import {OperationEntity, OperationType, PaymentCategory} from "types";

export const operationColorHandler = (operation: OperationEntity | null) => {
    const buttonStyles = 'text:sm font-semibold mr-1 btn btn-xs p-0.5 ';
    if (!operation) {
        return null;
    }
    if (operation.type === OperationType.Payment) {
        switch (operation.category) {
            case (PaymentCategory.BasicNeeds): {
                return buttonStyles + '';
            }
            case (PaymentCategory.Additional): {
                return buttonStyles + 'btn-primary';
            }
            case (PaymentCategory.FreeTime): {
                return buttonStyles + 'btn-warning';
            }
            case (PaymentCategory.Unexpected) : {
                return buttonStyles + 'btn-success';
            }
            default:
                return null;
        }
    }

};