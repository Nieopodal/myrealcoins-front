import React from "react";
import cn from "classnames";

type Props = {
    children: React.ReactNode;
    biggerSize?: boolean;
    open: boolean;
};

export const Modal = ({children, open, biggerSize}: Props) => {
    const modalClass = cn({
        "modal modal-middle": true,
        "modal-open": open,
    });
    return <div className={modalClass}>
            <div className={`modal-box ${biggerSize ? 'w-11/12 max-w-5xl' : ''}`}>{children}</div>
        </div>
};
