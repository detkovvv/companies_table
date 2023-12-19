import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { addEmployee, removeEmployee, updateEmployee } from './EmployeesSlice';
import {
    type CompanyFullType,
    type EmployeeFullType,
    type OnChangeCellValue,
} from '../../utils/types';

export type CompaniesStoreType = {
    data: CompanyFullType[];
    checked: string[];
    isLoading: boolean;
    error: string;
};

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
        setCheckedCompany: (state, action: PayloadAction<string[]>) => {
            state.checked = action.payload;
        },
        addCompany: (state, action: PayloadAction<CompanyFullType>) => {
            state.data.push(action.payload);
        },
        removeCompany: (state, action: PayloadAction<string[]>) => {
            state.data = state.data.filter((company) => !action.payload.includes(company.id));
            state.checked = [];
        },
        updateCompany: (state, action: PayloadAction<OnChangeCellValue>) => {
            const { rowId, columnId, value } = action.payload;
            state.data = state.data.map((company) => {
                if (company && company.id === rowId) {
                    return {
                        ...(company as CompanyFullType),
                        [columnId]: value,
                    };
                }
                return company;
            });
        },
    },
    extraReducers(builder) {
        builder.addCase(addEmployee, (state, action) => {
            const newEmployee = action.payload;
            const companyId = state.checked[0];
            const companyIndex = state.data.findIndex((company) => company.id === companyId);
            if (companyIndex !== -1) {
                state.data[companyIndex].employees.push(newEmployee);
            }
        });

        builder.addCase(removeEmployee, (state, action) => {
            const removedEmployeeIds = action.payload;
            state.data.forEach((company) => {
                company.employees = company.employees.filter(
                    (employee) => !removedEmployeeIds.includes(employee.id),
                );
            });
        });

        builder.addCase(updateEmployee, (state, action) => {
            const { rowId, columnId, value } = action.payload;
            state.data.forEach((company) => {
                company.employees = company.employees.map((employee) => {
                    if (employee.id === rowId) {
                        return {
                            ...(employee as EmployeeFullType),
                            [columnId]: value,
                        };
                    }
                    return employee;
                });
            });
        });
    },
});

export const {
    addCompany,
    removeCompany,
    updateCompany,
    setCheckedCompany,
    companiesFetching,
    companiesFetchingSuccess,
    companiesFetchingError,
} = companiesSlice.actions;
