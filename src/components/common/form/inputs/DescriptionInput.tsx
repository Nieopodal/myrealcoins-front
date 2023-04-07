import React from "react";
import {useFormContext} from "react-hook-form";

export const DescriptionInput = () => {
    const {register} = useFormContext();

    return <div>
        <label className="label">
            <span className="label-text text-base w-fit mx-auto">Opis operacji (opcjonalny)</span>
        </label>
        <input type="text"
               {...register("description", {maxLength: 50})}
               maxLength={50} className="input input-bordered w-full max-w-xs mb-4"
        />
    </div>
};