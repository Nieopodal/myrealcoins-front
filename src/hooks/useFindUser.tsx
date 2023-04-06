import {useState, useEffect} from 'react';
import {ApiResponse, PeriodEntity, UserEntity} from 'types';

export default function useFindUser() {
    const [user, setUser] = useState<UserEntity | null>(null);
    const [actualPeriod, setActualPeriod] = useState<PeriodEntity | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('http://localhost:3001/user/check-user', {
                    credentials: "include",
                });

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
                console.log(e);
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