import React from "react";
import {DescriptionBtn} from "../Description/DescriptionBtn";

interface Props {
    title: string;
    value: number | string;
    description?: string;
    btnAction?: () => void;
    btnDescription?: string;
    ownTitleClasses?: string;
    ownValueClasses?: string;
    ownClasses?: string;
    isPast?: boolean;
}

export const OneStat = (props: Props) => {

    const {
        title,
        value,
        description,
        btnAction,
        btnDescription,
        ownClasses,
        ownTitleClasses,
        ownValueClasses,
        isPast
    } = props;

    return <div className={ownClasses ? ownClasses : "sm:px-auto p-2 sm:stat "}>
        <div className="mx-auto sm:mx-0 w-fit sm:w-auto">
            <div
                className={ownTitleClasses ? ownTitleClasses : "stat-title text-xs md:text-base font-semibold"}>
                {title}
            </div>

            <div
                className={ownValueClasses ? ownValueClasses : "stat-value text-base md:text-xl xl:text-2xl"}>
                {typeof value === 'number' ? value.toFixed(2) : value}
            </div>

            {description && <div className="stat-desc">{description}</div>}

            {
                !isPast && btnAction && btnDescription && <div className="stat-desc pt-2">
                    <DescriptionBtn text={btnDescription}/>
                </div>
            }
        </div>
    </div>
};