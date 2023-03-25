import {useEffect, useState} from "react";
import { ApiResponse, OperationEntity, PeriodEntity } from "types";

type FetchedData = OperationEntity | OperationEntity[] | PeriodEntity[] | PeriodEntity;

export const useFetch = (url: string, reload?: boolean) => {

    const [data, setData] = useState<FetchedData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        console.log('reloaded usefetch');
        (async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:3001/${url}`);
                const fetchedData: ApiResponse<FetchedData | null> = await res.json();

                if (fetchedData.success) {
                    if (fetchedData.payload === null) {
                        setData(null);
                    } else {
                        setData(fetchedData.payload);
                    }
                } else if (fetchedData.error) {
                    setError(fetchedData.error);
                } else {
                    setError('Wystąpił nieznany błąd serwera. Spróbuj później.');
                }
            } catch (e) {
                setError(`Wystąpił błąd podczas próby wykonania zapytania.`);
            } finally {
                setLoading(false);
            }
        })();
    }, [url, reload]);

    return [data, error, loading];
};