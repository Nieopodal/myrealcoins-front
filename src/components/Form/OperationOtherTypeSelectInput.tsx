import {InputErrorMessage} from "./InputErrorMessage";
import React from "react";
import {useFormContext} from "react-hook-form";

export const OperationOtherTypeSelectInput = () => {
    const {register, getValues, formState: {errors}} = useFormContext();

    const validationHandler = (value: string) => {
        if (!value && getValues("type") === '9') return "Wymagane";
        return true;
    };

    return <div className="mx-auto pt-4 w-fit">
        <InputErrorMessage errorMessage={errors.otherType?.message as string}/>

        <select
            className="select select-bordered w-full max-w-xs"
            {...register("otherType", {
                validate: (value) => validationHandler(value)
            })}
            defaultValue="">

            <option value="" disabled>Wybierz dokładny typ operacji</option>
            <option value={0}>Wpłata do budżetu</option>
            <option value={3}>Wypłata z bieżących oszczędności</option>
            <option value={6}>Redukcja budżetu</option>
            <option value={5}>Wypłata z poduszki finansowej</option>
        </select>

    </div>
};