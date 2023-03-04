import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {OperationsTable} from "../common/OperationsTable";
import {setOperations} from "../../features/operations/operations-slice";
import {OperationEntity } from "types";
import {useFetch} from "../../hooks/useFetch";

export const AllOperations = () => {
    const dispatch = useDispatch();
    const {operations} = useSelector((state: RootState) => state.operations);
    const [data, error, loading] = useFetch(`operation/get-period-operations/test-period-id`);

    useEffect(() => {
        if (error) {
            console.log('błąd', error);
        }
        if (data === null) {
            dispatch(setOperations([]));
        }
        dispatch(setOperations(data as OperationEntity[]));

    }, [data, error, loading, dispatch]);

    if (loading) {
        return <p>Ładowanie danych</p>
    }
    return <div className="py-10">
    <OperationsTable operations={operations ?? []} title="Lista operacji w obecnym okresie"/>;
    </div>
};