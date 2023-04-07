import React from "react";
import {OperationEntity} from "types";
import {Card} from "./Card";
import {TableRow} from "../Dashboard/TableRow";
import ThreeDots from "./Loader";

interface Props {
    operations: OperationEntity[];
    title: string;
    btnAction?: () => void;
    btnDescription?: string;
    loading: boolean;
}

export const OperationsTable = ({operations, title, btnAction, btnDescription, loading}: Props) => {

    return (
        <Card
            additionalClasses={`mx-auto xl:w-[90%] 2xl:w-[80%] pt-4 xl:px-2 text-xs md:text-base ${!btnAction && `pb-10`}`}
            btnDescription={btnDescription ?? undefined}
            btnAction={btnAction ?? undefined}
        >
            <h3 className="card-title mx-auto w-fit pt-2">{title} </h3>
            <div className="overflow-x-auto card-body px-0 w-full rounded-none pb-0">
                {loading && <ThreeDots/>}
                {!loading && <table className="table w-full p-0">

                    <tbody>

                    {operations.length > 0 && operations.map(operation => <TableRow key={operation.id}
                                                                                    operation={operation}/>)
                    }
                    {operations.length === 0 && <tr>
                        <td className="text-center">Brak operacji.</td>
                    </tr>}

                    </tbody>
                </table>}
            </div>
        </Card>
    )
};