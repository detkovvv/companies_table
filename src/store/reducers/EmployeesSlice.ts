import { createSlice } from '@reduxjs/toolkit';

import { companiesSlice } from './CompaniesSlice';

export interface Employee {
    id: string;
    surname: string;
    name: string;
    position: string;
}

export const employeesSlice = createSlice({
    name: 'employees',
    initialState: [] as Employee[],
    reducers: {
        addEmployee: (state, action) => {
            state.push(action.payload);
        },
        removeEmployee: (state, action) => {
            return state.filter(employee => !action.payload.includes(employee));
        },
        updateEmployee: (state, action) => {
            const { id, field, value } = action.payload;
            const employee = state.find(e => e.id === id);
            if (employee) {
                employee[field] = value;
            }
        },
    },
});
export const {addEmployee, removeEmployee, updateEmployee} = employeesSlice;