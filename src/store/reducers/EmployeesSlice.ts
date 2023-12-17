import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type EmployeeType } from '../../utils/types';


export type EmployeeStoreType = {
    data: EmployeeType[];
    checked: string[];
    isLoading: boolean;
    error: string;
}

export const initialState: EmployeeStoreType = {
    data: [],
    checked: [],
    isLoading: false,
    error: '',

};
export const employeesSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        employeesFetchingSuccess: (state, action: PayloadAction<EmployeeType[]>) => {
            state.data = action.payload;
        },
        setCheckedEmployee: (state, action:PayloadAction<string[]>)=>{
            state.checked = action.payload;
        },
        addEmployee: (state, action: PayloadAction<EmployeeType>) => {
            state.data.push(action.payload);
        },
        removeEmployee: (state, action:PayloadAction<string[]>) => {
            state.data = state.data.filter(employee => !action.payload.includes(employee.id) );
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

export const { employeesFetchingSuccess, setCheckedEmployee, addEmployee, removeEmployee } = employeesSlice.actions;