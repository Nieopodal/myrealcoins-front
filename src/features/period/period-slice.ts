import {createSlice} from "@reduxjs/toolkit";
import {PeriodEntity} from 'types';

interface PeriodState {
    id: string;
    userId: string;
    isActive: boolean;
    starts: string;
    ends: string;
    budgetAmount: number;
    paymentsAmount: number;
    savingsAmount: number;
    freeCashAmount: number;
    createdAt: string;
}

export const periodInitialState = {
    actualPeriod: {
        id: '',
        userId: '',
        isActive: false,
        starts: '',
        ends: '',
        budgetAmount: 0,
        paymentsAmount: 0,
        savingsAmount: 0,
        freeCashAmount: 0,
        createdAt: '',
    } as PeriodState | null,
};

interface SetActual {
    payload: PeriodEntity | null
}
export const periodSlice = createSlice({
    name: 'period',
    initialState: periodInitialState,
    reducers: {
        setActual: (state, action: SetActual) => {
            state.actualPeriod = action.payload;
        },
    },
});

export const {setActual} = periodSlice.actions;