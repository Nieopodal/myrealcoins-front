import React from "react";
import {useFormContext} from "react-hook-form";

interface Props {
    name: string;
    title: string;
    validation?: () =>{};
}

export const CheckboxInput = ({name, title}: Props) => {
    const {register} = useFormContext();

    return <div className="form-control mx-auto">
        <label className="label cursor-pointer">
            <span className="label-text mr-1">{title}</span>
            <input type="checkbox" {...register(name)} className="toggle toggle-"/>
        </label>
    </div>
}