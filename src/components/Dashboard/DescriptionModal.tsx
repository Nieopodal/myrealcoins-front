import {Modal} from "../common/Modal/Modal";
import React from "react";

interface Props {
    text: string;
    handleToggle: () => void;
    open: boolean;
}

export const DescriptionModal = ({text, handleToggle, open}: Props) => {
    return <Modal open={open}>
        <div className="whitespace-normal text-base text-justify py-4">{text}</div>
        <div className="modal-action justify-center">
            <button className="btn btn-outline" onClick={handleToggle}>
                Zamknij
            </button>
        </div>
    </Modal>
};