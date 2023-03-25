import {useFetch} from "../../hooks/useFetch";
import React, {useEffect, useState} from "react";
import {OperationEntity, OperationType, PaymentCategory, PaymentSubcategory} from "types";
import {Card} from "../common/Card";
import {decodeOperationType} from "../../utils/decode-operation-type";
import {decodeOperationSubtype, decodePaymentType} from "../../utils/decode-payment-type";
import {pricifyHandler} from "../../utils/pricify-handler";
import {useParams} from "react-router-dom";
import {BtnOutline} from "../common/BtnOutline";
import ThreeDots from "../common/Loader";
import {showToast, Toast} from "../../utils/show-toast";
import {DeleteModal} from "./DeleteModal";
import {ReceiptModal} from "./ReceiptModal";
import {operationColorHandler} from "../../utils/operation-color-handler";
import {EditionModal} from "./EditionModal";
import {DetailsTableRow} from "./DetailsTableRow";
import {Dropdown} from "../common/Dropdown";
import {DropdownButton} from "../common/DropdownButton";

export const OneOperation = () => {
    const {operationId, edit} = useParams();
    const [operation, setOperation] = useState<OperationEntity | null>(null);
    const [openDelete, setOpenDelete] = useState(false);
    const [openReceipt, setOpenReceipt] = useState(false);
    const [deleteSchema, setDeleteSchema] = useState<boolean>(false);
    const [deleteOperation, setDeleteOperation] = useState<boolean>(false);
    const [color, setColor] = useState('');
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [isOperationSchema, setIsOperationSchema] = useState<boolean>(false);
    const [editingOperationId, setEditingOperationId] = useState<string>('');
    const [reload, setReload] = useState<boolean>(false);
    const [data, error, loading] = useFetch(`operation/${operationId}`, reload);

    const deleteOperationHandler = (deleteOne: boolean, deleteSchema: boolean) => {
        deleteOne ? setDeleteOperation(true) : setDeleteOperation(false);
        deleteSchema ? setDeleteSchema(true) : setDeleteSchema(false);
        handleToggleDeleteModal();
    };

    const editOperationHandler = (editOperationId: string, isOperationSchema: boolean) => {
        setIsOperationSchema(isOperationSchema);
        setEditingOperationId(isOperationSchema ? operation!.originId as string : operation!.id as string);
        handleToggleEditModal();
    };

    const handleToggleDeleteModal = () => setOpenDelete((prev) => !prev);
    const handleToggleReceiptModal = () => setOpenReceipt((prev) => !prev);
    const handleToggleEditModal = () => setOpenEdit((prev) => !prev);

    const handleSetReload = () => setReload(prev => !prev);

    useEffect(() => {
        const operationColor = operationColorHandler(operation);
        if (operationColor) setColor(operationColor);
        if (error) {
            showToast(Toast.Error, error as string);
        }
        if (data) {
            setOperation(data as OperationEntity);
        }
    }, [data, error, loading, deleteOperation, deleteSchema, color, operation, setDeleteOperation, setDeleteSchema]);

    return <>
        {openDelete && <DeleteModal deleteOperation={deleteOperation} deleteSchema={deleteSchema} open={openDelete}
                                    id={operationId!} originId={operation!.originId as string}
                                    handleToggle={handleToggleDeleteModal}/>}

        {openReceipt &&
            <ReceiptModal operationId={operationId!} handleToggle={handleToggleReceiptModal} open={openReceipt}/>}

        {openEdit &&
            <EditionModal isOperationSchema={isOperationSchema} operationId={editingOperationId} open={openEdit}
                          handleToggle={handleToggleEditModal} reloadHandler={handleSetReload}/>
        }

        <Card
            additionalClasses="mx-auto lg:w-[50%] mt-10 px-0 xl:px-2 text-xs md:text-base pt-5">
            <h3 className="card-title mx-auto w-fit  pb-5">Szczegóły operacji</h3>

            {(loading) && <ThreeDots/>}
            {(!loading) && <div>
                {(data && operation)

                    ?

                    <div>
                        {operation.isRepetitive && !operation.originId &&
                            <h4 className="mx-auto w-fit font-bold text-red-600">Uwaga: to jest widok schematu</h4>}
                        <table className="table table-zebra w-full pb-0">

                            <tbody>

                            <DetailsTableRow title="Typ">
                                {decodeOperationType(operation.type)}
                            </DetailsTableRow>

                            {operation.type === OperationType.Payment && color &&
                                <DetailsTableRow title="Kategoria">
                                    <span
                                        className={`${color}`}>{decodePaymentType(operation.category as PaymentCategory)}: {
                                        decodeOperationSubtype(operation.category as PaymentCategory, operation.subcategory as PaymentSubcategory)}
                                    </span>
                                </DetailsTableRow>
                            }

                            <DetailsTableRow title="Opis">
                                <span>{operation.description!.length > 0 ? operation.description : 'brak'}</span>
                            </DetailsTableRow>

                            <DetailsTableRow title="Kwota">
                                <span>{pricifyHandler(operation.amount)} PLN</span>
                            </DetailsTableRow>

                            <DetailsTableRow title="Data i czas">
                                {operation.createdAt}
                            </DetailsTableRow>

                            <DetailsTableRow title="Cykliczność">
                                {operation.isRepetitive ? `tak` : `nie`}
                            </DetailsTableRow>

                            <DetailsTableRow title="Paragon">
                                {operation.imgUrl ? <BtnOutline
                                    btnAction={handleToggleReceiptModal} btnDescription="Wyświetl"/> : `brak`}
                            </DetailsTableRow>

                            {!edit && <DetailsTableRow title="Lokalizacja">
                                {(operation.lat && operation.lon) ? `Wyświetl` : `brak`}
                            </DetailsTableRow>
                            }

                            <DetailsTableRow title="Akcje">
                                {!operation.originId && <div>
                                    <BtnOutline btnAction={() => editOperationHandler(operation.id, false)}
                                                btnDescription="Edytuj"/>
                                    &nbsp;
                                    <BtnOutline btnAction={() => deleteOperationHandler(true, false)}
                                                btnDescription="Usuń"/>
                                </div>
                                }

                                {operation.originId && <div>

                                    <Dropdown title="Opcje edycji">
                                        <DropdownButton
                                            btnTitle="Edytuj tę operację"
                                            handler={() => editOperationHandler(operation.id, false)}/>

                                        <DropdownButton btnTitle="Edytuj schemat"
                                                        handler={() => editOperationHandler(operation.originId as string, true)}/>
                                    </Dropdown>

                                    &nbsp;

                                    <Dropdown title="Opcje
                                            usuwania">
                                        <DropdownButton btnTitle="Usuń tę
                                                    operację" handler={() => deleteOperationHandler(true, false)}/>
                                        <DropdownButton btnTitle="Usuń
                                                    schemat" handler={() => deleteOperationHandler(false, true)}/>
                                        <DropdownButton btnTitle="Usuń operację i schemat"
                                                        handler={() => deleteOperationHandler(true, true)}/>
                                    </Dropdown>
                                </div>
                                }
                            </DetailsTableRow>

                            </tbody>
                        </table>
                    </div>

                    :
                    <p className="mx-auto w-fit py-10">Operacja nie została odnaleziona.</p>
                }
            </div>}
        </Card>
    </>
};