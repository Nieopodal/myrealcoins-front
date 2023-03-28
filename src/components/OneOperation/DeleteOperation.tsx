import {BtnOutline} from "../common/BtnOutline";
import React, {useState} from "react";
import {Dropdown} from "../common/Dropdown";
import {DropdownButton} from "../common/DropdownButton";
import {DeleteModal} from "./DeleteModal";

interface Props {
    originId?: string;
    operationId: string;
}

export const DeleteOperation = ({originId, operationId}: Props) => {

    const [openDelete, setOpenDelete] = useState(false);
    const [deleteSchema, setDeleteSchema] = useState<boolean>(false);
    const [deleteOperation, setDeleteOperation] = useState<boolean>(false);

    const handleToggleDeleteModal = () => setOpenDelete((prev) => !prev);

    const deleteOperationHandler = (deleteOne: boolean, deleteSchema: boolean) => {
        deleteOne ? setDeleteOperation(true) : setDeleteOperation(false);
        deleteSchema ? setDeleteSchema(true) : setDeleteSchema(false);
        handleToggleDeleteModal();
    };

    return <>
        {openDelete && <DeleteModal deleteOperation={deleteOperation} deleteSchema={deleteSchema} open={openDelete}
                                    id={operationId!} originId={originId as string}
                                    handleToggle={handleToggleDeleteModal}/>}
        {!originId && <BtnOutline btnAction={() => deleteOperationHandler(true, false)}
                                  btnDescription="Usuń"/>}

        {originId && <Dropdown title="Opcje usuwania">
            <DropdownButton btnTitle="Usuń tę operację" handler={() => deleteOperationHandler(true, false)}/>
            <DropdownButton btnTitle="Usuń schemat" handler={() => deleteOperationHandler(false, true)}/>
            <DropdownButton btnTitle="Usuń operację i schemat"
                            handler={() => deleteOperationHandler(true, true)}/>
        </Dropdown>}
    </>
}