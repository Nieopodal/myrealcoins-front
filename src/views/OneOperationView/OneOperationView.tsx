import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useFetch} from "../../hooks/useFetch";
import {OperationEntity} from "types";
import {Card} from "../../components/common/Card/Card";
import ThreeDots from "../../components/common/Loader";
import {showToast, Toast} from "../../utils/show-toast";
import {operationColorHandler} from "../../utils/handlers/operation-color-handler";
import {OneOperationTable} from "../../components/OneOperation/OneOperationTable";

export const OneOperationView = () => {
    const {operationId} = useParams();
    const [operation, setOperation] = useState<OperationEntity | null>(null);
    const [color, setColor] = useState('');
    const [reload, setReload] = useState<boolean>(false);
    const [data, error, loading] = useFetch(`operation/${operationId}`, reload);

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
    }, [data, error, color, operation]);

    return <>
        <Card
            additionalClasses="mx-auto lg:w-[50%] mt-10 px-0 xl:px-2 text-xs md:text-base pt-5 whitespace-normal">
            <h3 className="card-title mx-auto w-fit  pb-5">Szczegóły operacji</h3>

            {(loading) && <ThreeDots/>}
            {(!loading) && <div>
                {(data && operation)
                    ? <OneOperationTable operation={operation} color={color} handleSetReload={handleSetReload}/>
                    : <p className="mx-auto w-fit py-10">Operacja nie została odnaleziona.</p>
                }
            </div>}
        </Card>
    </>
};