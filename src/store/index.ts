import {configureStore} from "@reduxjs/toolkit";
import {periodSlice} from "../features/period/period-slice";
import {operationsSlice} from "../features/operations/operations-slice";

export const store = configureStore({
    reducer: {
        period: periodSlice.reducer,
        operations: operationsSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
