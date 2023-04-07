import React, {useEffect} from "react";
import {OperationEntity} from "types";
import {useDispatch, useSelector} from "react-redux";
import {setOperations} from "../../features/operations/operations-slice";
import {RootState} from "../../store";
import {OperationsTable} from "../common/OperationsTable";
import {useFetch} from "../../hooks/useFetch";
import {useNavigate} from "react-router-dom";
import {showToast, Toast} from "../../utils/show-toast";

interface Props {
    periodId: string;
    isPast?: boolean;
}

export const LastOperationsCard = ({periodId, isPast}: Props) => {

    let navigate = useNavigate();
    const routeChange = (path: string) => {
        navigate(path);
    };

    const dispatch = useDispatch();
    const {operations} = useSelector((state: RootState) => state.operations);

    const [data, error, loading] = useFetch(`operation/get-period-operations/${periodId}`);

    useEffect(() => {
        if (error) {
            showToast(Toast.Error, error as string);
        }
        if (data === null) {
            dispatch(setOperations([]));
        }
        dispatch(setOperations(data as OperationEntity[]));
    }, [data, error, loading, dispatch]);

    return (
        <OperationsTable operations={operations ? operations.slice(0, 3) : []}
                         title={`Ostatnie operacje ${isPast ? `okresu` : ``}`}
                         btnAction={() => routeChange(`/operation-list`)} loading={loading as boolean}
                         btnDescription="Pełna lista operacji"
        />
    );
};