import {createContext} from 'react';
import {PeriodEntity, UserEntity} from 'types';

interface UserContextInterface {
    user: UserEntity | null;
    actualPeriod: PeriodEntity | null;
    isLoading: boolean;
    setUser: (payload: UserEntity | null) => void;
    setActualPeriod: (payload: PeriodEntity) => void;
    error: string | null;
}

export const UserContext = createContext<UserContextInterface>({
    error: null,
    user: null,
    actualPeriod: null,
    isLoading: false,
    setUser: () => {},
    setActualPeriod: () => {},
});