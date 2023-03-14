import {Modal} from "../common/Modal";
import React, {useEffect, useState} from "react";
import { ApiResponse } from "types";
import {showToast, Toast} from "../../utils/show-toast";
import {useNavigate} from "react-router-dom";

interface Props {
    id: string;
    originId: string;
    open: boolean;
    handleToggle: () => void;
    deleteSchema: boolean;
    deleteOperation: boolean;
}

const fetchDelete = async (id: string) => {
    try {
        const res = await fetch(`http://localhost:3001/operation/${id}`, {
            method: 'DELETE',
        });
        const data: ApiResponse<boolean> = await res.json();

        if (data) {
            return data;
        } else {
            return null;
        }
    } catch {
        return null;
    }
};

export const DeleteModal = ({id, open, handleToggle, deleteSchema, deleteOperation, originId}: Props) => {
    const navigate = useNavigate();
    const formSubmitHandler = async (deleteOperation: boolean, deleteSchema: boolean) => {
        setLoading(true);
        if (deleteSchema) {
            const outputSchema =  await fetchDelete(`${originId}/${id}`);
            try {
                if (outputSchema) {
                    if (outputSchema.success) {
                        setOutputSchema(outputSchema.payload);
                    } else if (outputSchema.error) {
                        setSchemaError(outputSchema.error);
                    } else {
                        setSchemaError('Podczas usuwania schematu wystąpił nieznany błąd serwera. Spróbuj później.');
                    }
                }
            } catch (e) {
                setError(`Wystąpił błąd podczas próby wykonania zapytania.`);
            } finally {
                setLoading(false);
            }
        }
        if (deleteOperation) {
            setLoading(true);
            const outputData =  await fetchDelete(id);
            try {
                if (outputData) {
                    if (outputData.success) {
                        setOutput(outputData.payload);
                    } else if (outputData.error) {
                        setError(outputData.error);
                    } else {
                        setError('Wystąpił nieznany błąd serwera. Spróbuj później.');
                    }
                }
            } catch (e) {
                setError(`Wystąpił błąd podczas próby wykonania zapytania.`);
            } finally {
                setLoading(false);
            }
        }
    };

    const [output, setOutput] = useState<boolean | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [outputSchema, setOutputSchema] = useState<boolean | null>(null);
    const [errorSchema, setSchemaError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(false);
        if (error) showToast(Toast.Error, error);
        if (output) showToast(Toast.Success, 'Pomyślnie usunięto operację.');
        if (errorSchema) showToast(Toast.Error, errorSchema);
        if (outputSchema) showToast(Toast.Success, 'Pomyślnie usunięto schemat.');

        if (deleteOperation && !deleteSchema) {
            if (output) setTimeout(() => {
                navigate('/', {replace: true});
            }, 500);

        } else if (!deleteOperation && deleteSchema) {
            if (outputSchema) setTimeout(() => {
                navigate('/', {replace: true});
            }, 500);
        } else if (deleteOperation && deleteSchema) {
            if (output && outputSchema) setTimeout(() => {
                navigate('/', {replace: true});
            }, 500);
        } else {
            handleToggle();
        }

    }, [error, errorSchema, output, outputSchema]);

    return <Modal open={open}>
        <h3 className="font-bold text-lg w-fit mx-auto">
            Operacje do wykonania:
        </h3>

        <div>
            <ul className="w-fit list-disc mx-auto py-4">
                {deleteOperation && <li>usunięcie pojedynczej operacji {output && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-700 inline-block">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg> } {!output && error && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-700 inline-block">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                }
                </li> }
                {deleteSchema && <li>usunięcie schematu {outputSchema && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-700 inline-block">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>} {!outputSchema && errorSchema && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-700 inline-block">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                }
                </li> }
            </ul>

        </div>

        <div className="modal-action justify-center">
            <button disabled={!!(loading || (!errorSchema && !error && (output || outputSchema)))} className={`btn btn-primary ${loading ? 'loading' : ``}`} onClick={() => formSubmitHandler(deleteOperation, deleteSchema)}>
                {loading ? `Proszę czekać` : `Usuń`}
            </button>
            <button disabled={loading} className="btn btn-outline" onClick={handleToggle}>
                Anuluj
            </button>
        </div>
    </Modal>
}