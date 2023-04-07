import React from "react";

interface Props {
    btnTitle: string;
    handler(): void;
}

export const DropdownButton = ({handler, btnTitle}: Props) => (
    <li>
        <button onClick={handler}>{btnTitle}</button>
    </li>
);