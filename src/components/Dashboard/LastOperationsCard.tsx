import React, {useEffect, useState} from "react";
import {ApiResponse, OperationEntity } from "types";
import {useDispatch, useSelector} from "react-redux";
import {setOperations} from "../../features/operations/operations-slice";
import {RootState} from "../../store";
import {OperationsTable} from "../common/OperationsTable";

interface Props {
    periodId: string;
}

export const LastOperationsCard = ({periodId}: Props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const {operations} = useSelector((state: RootState) => state.operations);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`http://localhost:3001/operation/get-period-operations/${periodId}`);
                const data: ApiResponse<OperationEntity[] | null> = await res.json();
                if (data.success) {
                    if (data.payload === null) {
                        console.log('Brak aktywnego okresu.');
                    } else {
                        console.log('Pobrano okres:', data.payload);
                        dispatch(setOperations(data.payload));
                    }
                } else if (data.error) {
                    console.log('Serwer informuje o błędzie', data.error);
                } else {
                    console.log('Błąd!');
                }
            } catch (e) {
                console.log(`Wystąpił błąd podczas próby wykonania zapytania.`);
            } finally {
                setLoading(false);
            }
        })();
    }, [dispatch, periodId]);

    if (loading) {
        return <p>Ładowanie danych</p>
    }

    return <OperationsTable operations={operations.slice(0,3)} title="Ostatnie operacje" btnAction={() => {}}/>

};