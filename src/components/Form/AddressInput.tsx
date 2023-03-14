import React from "react";
import {useFormContext} from "react-hook-form";
import {InputErrorMessage} from "./InputErrorMessage";

interface Props {
    title: string;
    name: string;
    minLength: number;
    maxLength: number;
}

export const AddressInput = ({title, name, minLength, maxLength}: Props) => {

    const {register, getValues, formState: {errors}} = useFormContext();
    const [localization, localizationFromPhoto] = getValues(["localization", "localization-from-photo"]);

    const validationHandler = (value: string) => {
            if (localization && !localizationFromPhoto && value.length < minLength) return `Wymagana liczba znaków: ${minLength} - ${maxLength}`;
            if (localization && !localizationFromPhoto && value.length > maxLength) return `Wymagana liczba znaków: ${minLength} - ${maxLength}`;
            return true;
    }

    return <div className="form-control w-full max-w-xs">
        <label className="label">
            <span className="label-text">{title}</span>
        </label>

        <input type="text" placeholder="" maxLength={maxLength}
               className="input input-bordered w-full max-w-xs" {...register(name, {
            validate: (value) => validationHandler(value),
        })}
        />
        <InputErrorMessage
            errorMessage={errors[name]?.message as string}
        />
    </div>
}