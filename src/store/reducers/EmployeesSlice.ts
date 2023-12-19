import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type EmployeeFullType, type OnChangeCellValue } from '../../utils/types';

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
            state.checked = [];
        },
        updateEmployee: (state, action: PayloadAction<OnChangeCellValue>) => {
            const { rowId, columnId, value } = action.payload;
            state.data = state.data.map((employee) => {
                if (employee && employee.id === rowId) {
                    return {
                        ...(employee as EmployeeFullType),
                        [columnId]: value,
                    };
                }
                return employee;
            });
        },
    },
});

export const {
    employeesFetching,
    setCheckedEmployee,
    addEmployee,
    removeEmployee,
    updateEmployee,
} = employeesSlice.actions;
