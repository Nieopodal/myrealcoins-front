import React from "react";
import {useFormContext} from "react-hook-form";

interface Props {
    latName: string;
    lonName: string;
}

export const HiddenCoordsInputs = ({latName, lonName}: Props) => {
    const {register} = useFormContext();

    return <div className="hidden">
        <input type="number" {...register(latName)}/>
        <input type="number" {...register(lonName)}/>
    </div>
}