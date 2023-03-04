import {createSlice} from "@reduxjs/toolkit";
import {OperationEntity} from "types";

interface OperationsState {
    operations: OperationEntity[],
}

const initialState: OperationsState = {
    operations: [],
};

interface SetOperations {
    payload: OperationEntity[];
}

export const operationsSlice = createSlice({
    name: 'operations',
    initialState: initialState,
    reducers: {
        setOperations: (state, action: SetOperations) => {
            state.operations = action.payload;
        },
    },
});

export const {setOperations} = operationsSlice.actions;