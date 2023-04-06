import {ApiResponse, OperationEntity} from "types";
import {showToast, Toast} from "../../utils/show-toast";
import React, { useState} from "react";
import {Modal} from "../common/Modal";
import {TableRow} from "./TableRow";

interface Props {
    open: boolean;
    operations: OperationEntity[];
}

export const RestoreOperationsModal = ({open, operations}: Props) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [restoreResults, setRestoreResults] = useState<number[]>([]);
    const [finishedOperation, setFinishedOperation] = useState<boolean>(false);

    const handleCloseModal = () => {
        window.location.reload();
    };

    const handleAddOperations = async () => {
        setLoading(true);
            for (const operation of operations) {
                try {
                    const res = await fetch(`http://localhost:3001/period/create-new-operation-from-schema/${operation.id}`, {
                        method: 'POST',
                        credentials: 'include',
                    });
                    const data: ApiResponse<true> = await res.json();
                    if (data.success) {
                        setRestoreResults(prev => [...prev, 1]);
                    } else {
                        showToast(Toast.Error, `Jedna z operacji nie została dodana. ${data.error}`);
                        setRestoreResults(prev => [...prev, 0]);
                    }
                } catch {
                    showToast(Toast.Error, `Nie udało się dodać operacji. Wystąpił błąd podczas wykonywania zapytania.`);
                } finally {
                    setLoading(false);
                    setFinishedOperation(true);
                }
            }
    };

    return <Modal open={open} biggerSize>
        <h3 className="font-bold text-lg w-fit mx-auto pb-6">
            Czy do nowego okresu dodać poniższe schematy?
        </h3>
        <table className="table table-zebra w-full">
            <tbody>
            {operations.length > 0 && operations.map((operation, index) => <TableRow key={operation.id}
                                                                                     operation={operation} isRestored
                                                                                     restoreResult={restoreResults[index]}/>)}
            </tbody>
        </table>
        {operations.length === 0 && <div className="mx-auto w-fit">Brak operacji.</div>}
        <div className="modal-action justify-center">
            <button className="btn btn-primary" onClick={handleAddOperations} disabled={operations.length === 0 || loading || finishedOperation}>Dodaj</button>
            <button className={`btn ${finishedOperation ? `btn-primary` : `btn-outline`}`} onClick={handleCloseModal} disabled={loading}>
                {finishedOperation ? 'Zakończ' : 'Anuluj'}
            </button>
        </div>

    </Modal>

};