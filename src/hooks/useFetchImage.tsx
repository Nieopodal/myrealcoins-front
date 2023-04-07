import {useEffect, useState} from "react";
import {FileTransferResponse} from "types";
import {fetchHandler} from "../utils/fetch/fetch-handler";

export const useFetchImage = (operationId: string) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);
    const [image, setImage] = useState<null | string>(null);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await fetchHandler(`http://localhost:3001/operation/image/${operationId}`);
                if (!res.ok) {
                    setError("Podczas pobierania pliku wystąpił błąd.");
                }
                const blob: FileTransferResponse = await res.blob();
                const theImage = URL.createObjectURL(blob);
                setImage(theImage);
            } catch (e) {
                setError(`Wystąpił błąd podczas próby wykonania zapytania.`);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return [image, error, loading];
};