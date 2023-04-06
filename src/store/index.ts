import {configureStore} from "@reduxjs/toolkit";
import {operationsSlice} from "../features/operations/operations-slice";

export const store = configureStore({
    reducer: {
        operations: operationsSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
