import React from "react";

interface Props {
    errorMessage?: string;
}

export const InputErrorMessage = ({errorMessage}: Props) => {
    if (errorMessage) return <div className="text-error mx-auto w-fit py-2 font-semibold">{errorMessage}</div>;
    return null;
};