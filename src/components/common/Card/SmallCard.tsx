import React from "react";
import {Card} from "./Card";

interface Props {
    children: React.ReactNode;
    innerClasses?: string;
    title?: string;
}

export const SmallCard = ({children, title, innerClasses}: Props) => (
    <Card additionalClasses={innerClasses ?? `mt-10 mx-auto sm:w-[60%] md:max-w-md py-4 xl:px-2 text-xs md:text-base`}>
        {title && <h3 className="card-title mx-auto w-fit pt-4">{title}</h3>}

        <div className="mx-2">{children}</div>
    </Card>
);