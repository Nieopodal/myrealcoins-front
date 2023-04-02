import React, {useContext} from "react";
import {Modal} from "../common/Modal";
import ThreeDots from "../common/Loader";
import {useFetchImage} from "../../hooks/useFetchImage";
import {ErrorMessage} from "../common/ErrorMessage";
import {SmallReceiptContext} from "../../contexts/small-receipt.context";

interface Props {
    operationId: string;
    handleToggle: () => void;
    open: boolean;
}

export const ReceiptModal = ({operationId, handleToggle, open}: Props) => {

    const smallReceipt = useContext(SmallReceiptContext);
    const [image, error, loading] = useFetchImage(operationId);

    return <Modal open={open} biggerSize>
        {loading && <ThreeDots smallerDisplay/>}

        {error && <ErrorMessage text={error as string}/>}

        {image && <img className={`${smallReceipt && `h-[60vh]`} h-fit md:p-5 w-fit mx-auto`} src={image as string}
                       alt="paragon fiskalny"/>}

        <div className="modal-action justify-center">
            <button className="btn btn-outline" onClick={handleToggle}>
                Zamknij
            </button>
        </div>
    </Modal>;
};