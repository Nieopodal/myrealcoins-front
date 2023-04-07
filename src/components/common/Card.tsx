import React, {useContext} from "react";
import {BtnOutline} from "./BtnOutline";
import {UserContext} from "../../contexts/user.context";

interface CardProps {
    children: React.ReactNode;
    additionalClasses?: string;
    btnDescription?: string;
    btnAction?: () => void;
}

export const Card = (props: CardProps) => {
    const {children, additionalClasses, btnDescription, btnAction} = props;
    const {user} = useContext(UserContext);

    return <div
        className={`${additionalClasses} card border-[1px] shadow-md mb-10 ${user ? 'xl:mb-0' : ''} overflow-hidden overflow-x-auto mx-1`}>
        {children}
        {btnDescription && btnAction && <div className="card-actions justify-end p-5">
            <BtnOutline btnAction={btnAction} btnDescription={btnDescription}/>
        </div>}
    </div>;
};