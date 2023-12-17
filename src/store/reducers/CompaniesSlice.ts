import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type CompanyFullType } from '../../utils/types';

export type StoreType = {
    companies: CompanyFullType[];
    isLoading: boolean;
    error: string;
}

export const initialState: StoreType = {
    companies: [],
    isLoading: false,
    error: '',

};
export const companiesSlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {
        companiesFetching: (state) => {
            state.isLoading = true;
        },
        companiesFetchingSuccess: (state, action: PayloadAction<CompanyFullType[]>) => {
            state.isLoading = false;
            state.error = '';
            state.companies = action.payload;
        },
        companiesFetchingError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // addCompany: (state, action: PayloadAction<Company>) => {
        //     state.push(action.payload);
        // },
        // removeCompany: (state, action) => {
        //     return state.filter(company => !action.payload.includes(company));
        // },
        // updateCompany: (state, action) => {
        //     const { name, address, value } = action.payload;
        //     const company = state.find(c => c.name === name);
        //     if (company) {
        //         company[address] = value;
        //     }
        // },
    },
});

export const { addCompany, removeCompany, updateCompany } = companiesSlice;