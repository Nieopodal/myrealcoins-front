import React from "react";
import {useFormContext} from "react-hook-form";
import {decodeOperationSubtype} from "../../utils/decode-payment-type";
import {Card} from "../common/Card";
import {PaymentCategory} from "types";

interface Props {
    title: string;
    btnClass?: string;
    paymentSubcategoryList: number[];
    paymentCategory: PaymentCategory;
}

export const PaymentCategoryRadio = ({title, btnClass, paymentSubcategoryList, paymentCategory}: Props) => {
    const {register, getValues} = useFormContext();

    const validationHandler = (value: string) => {
        if (!value && getValues("type")[0] === '1') return "Wymagane!";
        return true;
    };

    return <Card additionalClasses="p-4 mb-2 overflow-visible flex-wrap ">
        <h4 className="font-semibold py-2">{title}</h4>
        <div>
            {paymentSubcategoryList.map(subcategory => (
                <label key={subcategory}>
                    <input className="peer hidden"
                           type="radio"
                           value={`${paymentCategory}#${subcategory}`}
                           {...register("category", {
                               validate: (value) => validationHandler(value),
                           })}
                    />
                    <span
                        className={`btn ${btnClass} btn-xs m-0.5 peer-checked:btn-outline`}>
                            {decodeOperationSubtype(paymentCategory, subcategory)}
                    </span>
                </label>
            ))}
        </div>
    </Card>
};