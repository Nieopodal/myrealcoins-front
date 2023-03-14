import React from "react";

interface Props {
    text?: string;
}

export const ErrorMessage = ({text}: Props) => (
    <div className="mx-auto font-semibold w-fit text-red-500 my-20">{text ?? `Wystąpił błąd, prosimy spróbować później.`}</div>
);