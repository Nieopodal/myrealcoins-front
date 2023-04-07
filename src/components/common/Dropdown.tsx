import React, {ReactNode} from "react";

interface Props {
    children: ReactNode;
    title: string;
}

export const Dropdown = ({title, children}: Props) => (
    <div className="dropdown dropdown-top dropdown-end">
        <label tabIndex={0}
               className="btn btn-outline btn-xs text-sm rounded-btn text-xs xl:text-sm mx-auto sm:mx-0 w-fit sm:w-auto">{title}</label>
        <ul tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-fit">
            {children}
        </ul>
    </div>
);