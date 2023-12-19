import { test, expect } from 'vitest';

import {
    addEmployee,
    employeesFetching,
    employeesSlice,
    removeEmployee,
    setCheckedEmployee,
    updateEmployee,
} from './EmployeesSlice';

const USER = { id: '1', name: 'John', surname: 'Johnson', position: 'manager' };
const INITIAL_STATE = { data: [], isLoading: true, error: '', checked: [] };

test('employeesFetching should update state correctly', () => {
    const actionPayload = [USER];

    const newState = employeesSlice.reducer(INITIAL_STATE, employeesFetching([USER]));

    expect(newState.data).deep.equal(actionPayload);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).equal('');
});

test('setCheckedEmployee should update state correctly', () => {
    const actionPayload = ['1', '2', '3'];

    const newState = employeesSlice.reducer(INITIAL_STATE, setCheckedEmployee(actionPayload));
    expect(newState.checked).deep.equal(actionPayload);
});

test('addEmployee should update state correctly', () => {
    const newState = employeesSlice.reducer(INITIAL_STATE, addEmployee(USER));
    expect(newState.data).deep.equal([USER]);
});

test('removeEmployee should update state correctly', () => {
    const initialState = {
        ...INITIAL_STATE,
        data: [USER, { ...USER, id: '2', name: 'Vasya' }],
    };
    const actionPayload = ['1'];

    const newState = employeesSlice.reducer(initialState, removeEmployee(actionPayload));

    expect(newState.data).deep.equal([
        { id: '2', name: 'Vasya', surname: 'Vasin', position: 'counter' },
    ]);
});
test('updateCompany should update state correctly', () => {
    const initialState = {
        ...INITIAL_STATE,
        data: [USER, { ...USER, id: '2', name: 'Vasya' }],
    };
    const actionPayload = { rowId: '1', columnId: 'name', value: 'Petya' };

    const newState = employeesSlice.reducer(initialState, updateEmployee(actionPayload));

    expect(newState.data).deep.equal([
        { id: '1', name: 'Petya', surname: 'Johnson', position: 'manager' },
    ]);
});
