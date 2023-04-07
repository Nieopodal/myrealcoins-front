import React from "react";
import {useFormContext} from "react-hook-form";
import {InputErrorMessage} from "../InputErrorMessage";
import {PaymentCategoryRadio} from "./PaymentCategoryRadio";
import {allPaymentCategories} from "../../../../utils/all-payment-categories";
import {PaymentCategory} from "types";

export const PaymentCategoryRadios = () => {
    const {formState: {errors}} = useFormContext();
    return <div>
        <label className="label w-fit mx-auto py-8">
            <h3
                className="label-text text-base font-semibold">Wybierz kategorię płatności:
                <InputErrorMessage errorMessage={errors.category?.message as string}/></h3>
        </label>

        <div className="grid xl:grid-cols-2 gap-4 px-4">
            <PaymentCategoryRadio
                title="Wydatki pierwszej potrzeby"
                paymentCategory={PaymentCategory.BasicNeeds}
                paymentSubcategoryList={allPaymentCategories.basicNeeds}
            />
            <PaymentCategoryRadio
                title="Opcjonalne"
                paymentCategory={PaymentCategory.Additional}
                paymentSubcategoryList={allPaymentCategories.additional}
                btnClass="btn-primary"
            />
            <PaymentCategoryRadio
                title="Kultura i czas wolny"
                paymentCategory={PaymentCategory.FreeTime}
                paymentSubcategoryList={allPaymentCategories.freeTime}
                btnClass="btn-warning"
            />
            <PaymentCategoryRadio
                title="Ekstra i nieprzewidziane"
                paymentCategory={PaymentCategory.Unexpected}
                paymentSubcategoryList={allPaymentCategories.unexpected}
                btnClass="btn-success"
            />
        </div>
    </div>
};