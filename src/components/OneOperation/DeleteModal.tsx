import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Modal} from "../common/Modal/Modal";
import {showToast, Toast} from "../../utils/show-toast";
import {ModalAction} from "../common/Modal/ModalAction";
import {SuccessSvg} from "../common/Svg/SuccessSvg";
import {ErrorSvg} from "../common/Svg/ErrorSvg";
import {fetchDelete} from "../../utils/fetch-delete";

interface Props {
    id: string;
    originId: string;
    open: boolean;
    handleToggle: () => void;
    deleteSchema: boolean;
    deleteOperation: boolean;
}

export const DeleteModal = ({id, open, handleToggle, deleteSchema, deleteOperation, originId}: Props) => {
    const navigate = useNavigate();
    const formSubmitHandler = async (deleteOperation: boolean, deleteSchema: boolean) => {
        setLoading(true);
        if (deleteSchema) {
            const outputSchema = await fetchDelete(`${originId}/${id}`);
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
            const outputData = await fetchDelete(id);
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
                {deleteOperation &&
                    <li>usunięcie pojedynczej operacji {output && <SuccessSvg/>
                    }
                        {
                            !output && error && <ErrorSvg/>
                        }
                    </li>
                }
                {deleteSchema &&
                    <li>usunięcie schematu {outputSchema && <SuccessSvg/>
                    }
                        {
                            !outputSchema && errorSchema && <ErrorSvg/>
                        }
                    </li>
                }
            </ul>
        </div>

        <ModalAction
            primaryBtnTitle='Usuń'
            primaryBtnDisabled={!!(loading || (!errorSchema && !error && (output || outputSchema)))}
            primaryBtnHandler={() => formSubmitHandler(deleteOperation, deleteSchema)}
            cancelBtnDisabled={loading}
            cancelBtnHandler={handleToggle}
            loading={loading}
        />

    </Modal>
};