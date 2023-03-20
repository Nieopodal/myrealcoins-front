import { OperationEntity, OperationType, PaymentCategory } from "types";
import {decodePaymentType} from "./decode-payment-type";

const filterPayments = (paymentOperations: OperationEntity[], condition: number) => {
    return paymentOperations.filter(op => op.category === condition);
};

const sum = (list: OperationEntity[]): number =>{
    const amounts = list.map(op => op.amount*-1);
    return amounts.reduce((prev, curr) => prev + curr, 0);
};
export const getPaymentsCategoriesAndAmountsHandler = (operations: OperationEntity[]) => {

    const categories: string[] = [];
    const amounts: number[] = [];
    const colors: string[] = [];

    const paymentOperations = operations.filter(op => op.type === OperationType.Payment);

    const basicNeeds = filterPayments(paymentOperations, PaymentCategory.BasicNeeds);
    if (basicNeeds.length > 0) {
        categories.push(decodePaymentType(PaymentCategory.BasicNeeds));
        amounts.push(sum(basicNeeds));
        colors.push('neutral');
    }
    const additional = filterPayments(paymentOperations, PaymentCategory.Additional);
    if (additional.length > 0) {
        categories.push(decodePaymentType(PaymentCategory.Additional));
        amounts.push(sum(additional));
        colors.push('primary');
    }
    const freeTime = filterPayments(paymentOperations, PaymentCategory.FreeTime);
    if (freeTime.length > 0) {
        categories.push(decodePaymentType(PaymentCategory.FreeTime));
        amounts.push(sum(freeTime));
        colors.push('warning');
    }
    const unexpected = filterPayments(paymentOperations, PaymentCategory.Unexpected);
    if (unexpected.length > 0) {
        categories.push(decodePaymentType(PaymentCategory.Unexpected));
        amounts.push(sum(unexpected));
        colors.push('success');
    }
    return {
        categories,
        amounts,
        colors,
    };
};