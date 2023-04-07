import React, {forwardRef} from "react";
import {useFormContext} from "react-hook-form";

interface Props {
    value: number;
    title: string;
    radioColor?: string;
    name: string;
    required: boolean | string;
}

export const RadioInput = forwardRef(({value, title, radioColor, name, required}: Props, ref) => {
    const {register} = useFormContext();

    return <div className="form-control">
        <label className="label cursor-pointer">
            <span className="label-text">{title}</span>
            <input type="radio" {...register(name, {
                valueAsNumber: true,
                required: required,
            })} value={Number(value)}
                   className={`radio checked:bg-${radioColor}-500`}/>
        </label>
    </div>
});