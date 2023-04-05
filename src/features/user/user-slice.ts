import {createSlice} from "@reduxjs/toolkit";
import {UserEntity} from 'types';
import {LocalizationSource} from 'types';

export const userInitialState = {
    actualUser: {
        id: '',
        email: '',
        password: '',
        name: '',
        financialCushion: 0,
        defaultBudgetAmount: 0,
        localizationSource: LocalizationSource.None,
        addLocalizationByDefault: false,
    },
};

interface SetActual {
    payload: UserEntity;
}

interface SetFinancialCushion {
    payload: number;
}

interface SetDefaultBudgetAmount {
    payload: number;
}

interface SetLocalizationByDefault {
    payload: boolean;
}

interface SetLocalizationSource {
    payload: LocalizationSource;
}

export const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        setUser: (state, action: SetActual) => {
            state.actualUser = action.payload;
        },
        setFinancialCushion: (state, action: SetFinancialCushion) => {
            state.actualUser.financialCushion = action.payload;
        },
        setDefaultBudgetAmount: (state, action: SetDefaultBudgetAmount) => {
            state.actualUser.defaultBudgetAmount = action.payload;
        },
        setLocalizationSource: (state, action: SetLocalizationSource) => {
            state.actualUser.localizationSource = action.payload;
        },
        addLocalizationByDefault: (state, action: SetLocalizationByDefault) => {
            state.actualUser.addLocalizationByDefault = action.payload;
        },
    },
});

export const {setUser, setDefaultBudgetAmount, setFinancialCushion, addLocalizationByDefault} = userSlice.actions;