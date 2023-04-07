import React from "react";

interface Props {
    text: string;
}

export const StepHeader = ({text}: Props) => (
    <h2 className="text-2xl font-bold mx-auto w-fit my-8 border-b-[1px]">{text}</h2>
);