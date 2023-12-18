import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type EmployeeFullType } from '../../utils/types';

export type EmployeeStoreType = {
    data: EmployeeFullType[];
    checked: string[];
    isLoading: boolean;
    error: string;
};

export const initialState: EmployeeStoreType = {
    data: [],
    checked: [],
    isLoading: false,
    error: '',
};
export const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        employeesFetching: (state, action: PayloadAction<EmployeeFullType[]>) => {
            state.data = action.payload;
            state.isLoading = false;
            state.error = '';
        },
        setCheckedEmployee: (state, action: PayloadAction<string[]>) => {
            state.checked = action.payload;
        },
        addEmployee: (state, action: PayloadAction<EmployeeFullType>) => {
            state.data.push(action.payload);
        },
        removeEmployee: (state, action: PayloadAction<string[]>) => {
            state.data = state.data.filter((employee) => !action.payload.includes(employee.id));
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

export const { employeesFetching, setCheckedEmployee, addEmployee, removeEmployee } =
    employeesSlice.actions;
