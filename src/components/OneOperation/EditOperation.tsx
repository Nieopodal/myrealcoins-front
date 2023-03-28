import {BtnOutline} from "../common/BtnOutline";
import React, {useState} from "react";
import {Dropdown} from "../common/Dropdown";
import {DropdownButton} from "../common/DropdownButton";
import {EditionModal} from "./EditionModal";

interface Props {
    operationId: string;
    originId?: string;
    handleSetReload: () => void;
}

export const EditOperation = ({operationId, originId, handleSetReload}: Props) => {

    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [isOperationSchema, setIsOperationSchema] = useState<boolean>(false);
    const [editingOperationId, setEditingOperationId] = useState<string>('');

    const editOperationHandler = (editOperationId: string, isOperationSchema: boolean) => {
        setIsOperationSchema(isOperationSchema);
        setEditingOperationId(isOperationSchema ? originId as string : operationId as string);
        handleToggleEditModal();
    };
    const handleToggleEditModal = () => setOpenEdit((prev) => !prev);
    return <>

        {!originId && <BtnOutline
            btnDescription="Edytuj"
            btnAction={() => editOperationHandler(operationId, false)}
        />}

        {originId && <Dropdown title="Opcje edycji">
            <DropdownButton
                btnTitle="Edytuj tę operację"
                handler={() => editOperationHandler(operationId, false)
                }/>

            <DropdownButton btnTitle="Edytuj schemat"
                            handler={() => editOperationHandler(originId as string, true)}/>
        </Dropdown>}

        {openEdit &&
            <EditionModal isOperationSchema={isOperationSchema}
                          operationId={editingOperationId}
                          open={openEdit}
                          handleToggle={handleToggleEditModal}
                          reloadHandler={handleSetReload}/>
        }
    </>

}