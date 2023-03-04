import {Card} from "./Card";
import {TableRow} from "../Dashboard/TableRow";
import React from "react";
import {OperationEntity} from "types";

interface Props {
    operations: OperationEntity[];
    title: string;
    btnAction: () => void;
}

export const OperationsTable = ({operations, title, btnAction}: Props) => {
    return <Card additionalClasses="mx-auto xl:w-[90%] 2xl:w-[80%] pt-4 xl:px-2 text-xs md:text-base"
                 btnDescription="Lista operacji" btnAction={btnAction}>
        <h3 className="card-title mx-auto w-fit pt-2">{title}</h3>
        <div className="overflow-x-auto card-body px-0 w-full rounded-none pb-0">
            <table className="table table-zebra w-full p-0">
                <tbody>
                {operations.length > 0 && operations.map(operation => <TableRow key={operation.id} operation={operation}/>)}
                {operations.length === 0 && <p className="mx-auto w-fit">Brak operacji.</p>}
                </tbody>
            </table>
        </div>
    </Card>
};