import React, {useEffect} from "react";
import {OperationEntity} from "types";
import {useDispatch, useSelector} from "react-redux";
import {setOperations} from "../../features/operations/operations-slice";
import {RootState} from "../../store";
import {OperationsTable} from "../common/OperationsTable";
import {useFetch} from "../../hooks/useFetch";
import {useNavigate} from "react-router-dom";

interface Props {
    periodId: string;
}

export const LastOperationsCard = ({periodId}: Props) => {

    let navigate = useNavigate();
    const routeChange = (path: string) => {
        navigate(path);
    };

    const dispatch = useDispatch();
    const {operations} = useSelector((state: RootState) => state.operations);

    const [data, error, loading] = useFetch(`operation/get-period-operations/${periodId}`);

    useEffect(() => {

        if (error) {
            console.log(error);
        }
        if (data === null) {
            dispatch(setOperations([]));
        }
        dispatch(setOperations(data as OperationEntity[]));

    }, [data, error, loading, dispatch]);

    if (loading) return <p>Ładowanie danych</p>;

    return <OperationsTable operations={operations ? operations.slice(0, 3) : []} title="Ostatnie operacje"
                            btnAction={() => routeChange(`/operation-list`)} btnDescription="Pełna lista operacji"/>;
};