import {useState, useEffect} from 'react';
import {ApiResponse, PeriodEntity, UserEntity} from 'types';
import {fetchHandler} from "../utils/fetch/fetch-handler";
import {apiUrl} from "../config/api";

export default function useFindUser() {
    const [user, setUser] = useState<UserEntity | null>(null);
    const [actualPeriod, setActualPeriod] = useState<PeriodEntity | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            try {
                const res = await fetchHandler(`${apiUrl}/api/session/check-user`);
                const responseData: ApiResponse<{
                    user: UserEntity,
                    actualPeriod: PeriodEntity | null;
                }> = await res.json();
                if (responseData.success) {
                    if (responseData.payload === null) {
                        return;
                    }
                    setActualPeriod(responseData.payload.actualPeriod);
                    setUser(responseData.payload.user);
                } else {
                    setError(responseData.error);
                }
            } catch (e) {
                setError('Wystąpił błąd podczas próby wykonania zapytania.');

            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return {
        error,
        user,
        setActualPeriod,
        actualPeriod,
        setUser,
        isLoading,
    }
};