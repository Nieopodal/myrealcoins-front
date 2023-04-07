import React from "react";
import {AllOperationsContext} from "../../contexts/all-operations.context";
import {OperationEntity} from "types";
import {Modal} from "../common/Modal/Modal";
import {Map} from "../Map/Map";

interface Props {
    open: boolean;
    operation: OperationEntity;
    handleToggle: () => void;
}

export const MapModal = ({open, operation, handleToggle}: Props) => {
    return <Modal open={open}>
        <AllOperationsContext.Provider value={{
            operations: [operation],
            loading: false,
        }}>
            <Map centerLat={operation.lat} centerLon={operation.lon}/>
        </AllOperationsContext.Provider>

        <div className="modal-action justify-center">
            <button className="btn btn-outline" onClick={handleToggle}>
                Zamknij
            </button>
        </div>

    </Modal>
};