import {StepHeader} from "./StepHeader";
import React from "react";
import {useFormContext} from "react-hook-form";
import {RadioInput} from "../Form/RadioInput";
import {InputErrorMessage} from "../Form/InputErrorMessage";
import {OperationOtherTypeSelectInput} from "../Form/OperationOtherTypeSelectInput";
import {PaymentCategoryRadios} from "../Form/PaymentCategoryRadios";

export const StepOneForm = () => {
    const {getValues, formState: {errors}} = useFormContext();
    const typeInputValue = getValues("type");

    return <div className="border-b-[1px] pb-4">
        <StepHeader text="Krok 1: Typ"/>

        <div className="w-fit mx-auto">
            <h3 className="pb-4 font-semibold">
                Wybierz typ operacji:
                <InputErrorMessage
                    errorMessage={errors.type?.message as string}
                />
            </h3>

            <RadioInput name="type" value={1} title="Płatność" radioColor="red" required="Wymagane"/>
            <RadioInput name="type" value={2} title="Oszczędzanie" radioColor="blue" required="Wymagane"/>
            <RadioInput name="type" value={9} title="Inne" radioColor="green" required="Wymagane"/>
        </div>

        {typeInputValue === "9" && <OperationOtherTypeSelectInput/>}
        {typeInputValue === '1' && <PaymentCategoryRadios/>}
    </div>
};