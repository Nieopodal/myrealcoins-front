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

export const OneOperation = () => {
    const {operationId} = useParams();
    const [operation, setOperation] = useState<OperationEntity | null>(null);
    const [openDelete, setOpenDelete] = useState(false);
    const [openReceipt, setOpenReceipt] = useState(false);
    const [data, error, loading] = useFetch(`operation/${operationId}`);
    const [deleteOperation, setDeleteOperation] = useState<boolean>(false);
    const [deleteSchema, setDeleteSchema] = useState<boolean>(false);

    const deleteOperationHandler = (deleteOne: boolean, deleteSchema: boolean) => {
        deleteOne ? setDeleteOperation(true) : setDeleteOperation(false);
        deleteSchema ? setDeleteSchema(true) : setDeleteSchema(false);
        handleToggleDeleteModal();
    }
    const handleToggleDeleteModal = () => setOpenDelete((prev) => !prev);
    const handleToggleReceiptModal = () => setOpenReceipt((prev) => !prev);

    useEffect(() => {
        if (error) {
            showToast(Toast.Error, error as string);
        }
        if (data) {
            setOperation(data as OperationEntity);
        }
    }, [data, error, loading, deleteOperation, deleteSchema, setDeleteOperation, setDeleteSchema]);

    return <>
        {openDelete && <DeleteModal deleteOperation={deleteOperation} deleteSchema={deleteSchema} open={openDelete} id={operationId!} originId={operation!.originId as string} handleToggle={handleToggleDeleteModal}/>}

        {openReceipt && <ReceiptModal operationId={operationId!} handleToggle={handleToggleReceiptModal} open={openReceipt}/>}
        <Card
            additionalClasses="mx-auto lg:w-[50%] mt-10 px-0 xl:px-2 text-xs md:text-base pt-5">
            <h3 className="card-title mx-auto w-fit  pb-5">Szczegóły operacji</h3>

            {loading && <ThreeDots/>}
            {!loading && <div>
            {(data && operation)

                ?

                <table className="table table-zebra w-full pb-0">
                    <tbody>
                    <tr>
                        <th>Typ</th>
                        <td>{decodeOperationType(operation.type)}</td>
                    </tr>
                    {operation.type === OperationType.Payment &&
                        <tr>
                            <th>Kategoria</th>
                            <td>{decodePaymentType(operation.category as PaymentCategory)}: {
                                decodeOperationSubtype(operation.category as PaymentCategory, operation.subcategory as PaymentSubcategory)}
                            </td>
                        </tr>}
                    <tr>
                        <th>Opis</th>
                        <td>{operation.description ?? 'brak'}</td>
                    </tr>
                    <tr>
                        <th>Kwota</th>
                        <td>{pricifyHandler(operation.amount)} PLN</td>
                    </tr>
                    <tr>
                        <th>Data i czas</th>
                        <td>{operation.createdAt}</td>
                    </tr>
                    <tr>
                        <th>Cykliczność</th>
                        <td>{operation.isRepetitive ? `tak` : `nie`}</td>
                    </tr>

                    <tr>
                        <th>Paragon</th>
                        <td>{operation.imgUrl ? <BtnOutline btnAction={handleToggleReceiptModal} btnDescription="Wyświetl"/> : `brak`}</td>
                    </tr>
                    <tr>
                        <th>Lokalizacja</th>
                        <td>{(operation.lat && operation.lon) ? `Wyświetl` : `brak`}</td>
                    </tr>
                    <tr>
                        <th>Akcje</th>
                        <td>
                            {
                                !operation.isRepetitive && <div>

                                <BtnOutline btnAction={() => {
                                }} btnDescription="Modyfikuj"/>
                                    &nbsp;
                                <BtnOutline btnAction={() => deleteOperationHandler(true, false)} btnDescription="Usuń"/>
                                </div>
                            }
                            {
                                operation.isRepetitive && <div>
                                <div className="dropdown dropdown-top dropdown-end">
                                    <label tabIndex={0}
                                           className="btn btn-outline btn-xs text-sm rounded-btn text-xs xl:text-sm mx-auto sm:mx-0 w-fit sm:w-auto">Modyfikuj</label>
                                    <ul tabIndex={0}
                                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-fit">
                                        <li><button onClick={() =>{}}>Modyfikuj tę operację</button></li>
                                        <li><button onClick={() =>{}}>Modyfikuj schemat</button></li>
                                    </ul>
                                </div>
                                    &nbsp;
                                <div className="dropdown dropdown-top dropdown-end">
                                    <label tabIndex={0}
                                           className="btn btn-outline btn-xs text-sm rounded-btn text-xs xl:text-sm mx-auto sm:mx-0 w-fit sm:w-auto">Opcje
                                        usuwania</label>
                                    <ul tabIndex={0}
                                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-fit">
                                        <li><button onClick={() => deleteOperationHandler(true, false)}>Usuń tę operację</button></li>
                                        <li><button onClick={() => deleteOperationHandler(false, true)}>Usuń schemat</button></li>
                                        <li><button onClick={() => deleteOperationHandler(true, true)}>Usuń operację i schemat</button></li>
                                    </ul>
                                </div>
                                </div>
                            }
                        </td>
                    </tr>
                    </tbody>
                </table>

                :
                <p className="mx-auto w-fit py-10">Operacja nie została odnaleziona.</p>
            }
            </div>}
        </Card>;
    </>
};