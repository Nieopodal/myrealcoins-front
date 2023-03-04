import React from "react";
import {BtnOutline} from "./BtnOutline";

interface CardProps {
    children: React.ReactNode;
    additionalClasses?: string;
    btnDescription?: string;
    btnAction?: () => void;
}
export const Card = (props: CardProps) => {
    const {children, additionalClasses, btnDescription, btnAction} = props;

    return <div className={`card border-[1px] shadow-md mb-10 xl:mb-0 overflow-hidden overflow-x-auto ${additionalClasses}`}>
        {children}
        {btnDescription && btnAction && <div className="card-actions justify-end p-5">
            <BtnOutline btnAction={btnAction} btnDescription={btnDescription}/>
        </div>}
        {!btnDescription && !btnAction && <div className="p-5"></div>}
    </div>;
};