import React from "react";

interface Props {
    btnAction: () => void;
    btnDescription: string;
}

export const BtnOutline = (props: Props) => {
    const {btnAction, btnDescription} = props;

    return <button className="btn btn-outline btn-xs text-sm rounded-btn text-xs xl:text-sm" onClick={btnAction}>{btnDescription}</button>
};