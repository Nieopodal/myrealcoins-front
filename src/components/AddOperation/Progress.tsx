import React from "react";

interface Props {
    progress: number;
}
export const Progress = ({progress}: Props) => {
    return <div className="w-fit mx-auto pt-8 text-sm md:text-base">
        <ul className="steps w-fit">
            <li className={`step step-primary`}>Typ operacji</li>
            <li className={`step ${progress > 1 && `step-primary`}`}>Kwota</li>
            <li className={`step ${progress > 2 && `step-primary`}`}>Informacje dodatkowe</li>
        </ul>
    </div>
};