import { createSlice } from '@reduxjs/toolkit';

import { type Employee } from './EmployeesSlice';

export interface Company {
    name: string;
    staff: number;
    address: string;
    employees: Employee[];
}

export const companiesSlice = createSlice({
    name: 'companies',
    initialState: [] as Company[],
    reducers: {
        addCompany: (state, action) => {
            state.push(action.payload);
        },
        removeCompany: (state, action) => {
            return state.filter(company => !action.payload.includes(company));
        },
        updateCompany: (state, action) => {
            const { name, field, value } = action.payload;
            const company = state.find(c => c.name === name);
            if (company) {
                company[field] = value;
            }
        },
    },
});

export const {addCompany, removeCompany, updateCompany} = companiesSlice;