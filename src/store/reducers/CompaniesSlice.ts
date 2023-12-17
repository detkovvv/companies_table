import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type CompanyFullType } from '../../utils/types';

export type CompaniesStoreType = {
    data: CompanyFullType[];
    checked: string[];
    isLoading: boolean;
    error: string;
}

export const initialState: CompaniesStoreType = {
    data: [],
    checked: [],
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
            state.data = action.payload;
        },
        companiesFetchingError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        setCheckedCompany: (state, action:PayloadAction<string[]>)=>{
            state.checked = action.payload;
        },
        addCompany: (state, action: PayloadAction<CompanyFullType>) => {
            state.data.push(action.payload);
        },
        removeCompany: (state, action:PayloadAction<string[]>) => {
            state.data = state.data.filter(company => !action.payload.includes(company.id) );
        },
        // updateCompany: (state, action) => {
        //     const { name, address, value } = action.payload;
        //     const company = state.find(c => c.name === name);
        //     if (company) {
        //         company[address] = value;
        //     }
        // },
    },
});

export const { addCompany, removeCompany, updateCompany, setCheckedCompany } = companiesSlice.actions;