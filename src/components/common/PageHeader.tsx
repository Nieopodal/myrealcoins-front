import React from "react";

interface Props {
    text: string,
}

export const PageHeader = ({text}: Props) => (
    <h1 className="mx-auto text-2xl lg:text-4xl font-semibold w-fit mb-2">{text}</h1>
);