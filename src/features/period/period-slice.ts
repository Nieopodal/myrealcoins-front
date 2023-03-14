import {createSlice} from "@reduxjs/toolkit";
import {PeriodEntity} from 'types';

interface periodState {
    actualPeriod: PeriodEntity | null
}
export const periodInitialState: periodState = {
    actualPeriod: null,
};

interface SetActual {
    payload: PeriodEntity
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