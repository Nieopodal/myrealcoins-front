import React from "react";
import {Modal} from "../common/Modal";
import ThreeDots from "../common/Loader";
import {useFetchImage} from "../../hooks/useFetchImage";
import {ErrorMessage} from "../common/ErrorMessage";

interface Props {
    operationId: string;
    handleToggle: () => void;
    open: boolean;
}

export const ReceiptModal = ({operationId, handleToggle, open}: Props) => {
    const [image, error, loading] = useFetchImage(operationId);

    return <Modal open={open}>
        {loading && <ThreeDots smallerDisplay/>}

        {error && <ErrorMessage text={error as string}/>}

        {image && <img className="p-2 md:p-5" src={image as string} alt="paragon fiskalny"/>}

        <div className="modal-action justify-center">
            <button className="btn btn-outline" onClick={handleToggle}>
                Zamknij
            </button>
        </div>
    </Modal>;
}