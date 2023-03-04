import React from "react";
import cn from "classnames";
type Props = {
    children: React.ReactNode;
    open: boolean;
};

export const Modal = ({ children, open }: Props) => {
    const modalClass = cn({
        "modal modal-middle": true,
        "modal-open": open,
    });
    return (
        <div className={modalClass}>
            <div className="modal-box">{children}</div>
        </div>
    );
};
