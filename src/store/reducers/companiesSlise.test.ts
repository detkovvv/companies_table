import { test, expect } from 'vitest';

import {
    addCompany,
    companiesFetching,
    companiesFetchingError,
    companiesFetchingSuccess,
    companiesSlice,
    removeCompany,
    setCheckedCompany,
} from './CompaniesSlice';

const COMPANY = {
    id: '11',
    name: 'Аэрофлот',
    address: 'г. Москва, ул. Ленина, д. 111',
    staff: 3,
    employees: [
        {
            id: '22',
            surname: 'Сидоров',
            name: 'Александр',
            position: 'Генеральный директор',
        },
        {
            id: '33',
            surname: 'Петров',
            name: 'Александр',
            position: 'Главный бухгалтер',
        },
        {
            id: '44',
            surname: 'Иванова',
            name: 'Екатерина',
            position: 'Финансовый директор',
        },
    ],
};

const INITIAL_STATE = { data: [], isLoading: true, error: '', checked: [] };

test('companiesFetching should update state correctly', () => {
    const newState = companiesSlice.reducer(INITIAL_STATE, companiesFetching());
    expect(newState.isLoading).toBe(true);
});

test('companiesFetchingSuccess should update state correctly', () => {
    const actionPayload = [COMPANY];

    const newState = companiesSlice.reducer(INITIAL_STATE, companiesFetchingSuccess([COMPANY]));

    expect(newState.data).deep.equal(actionPayload);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).equal('');
});

test('companiesFetchingError should update state correctly', () => {
    const CUSTOM_ERROR_MESSAGE = 'unknown error';
    const actionPayload = new Error(CUSTOM_ERROR_MESSAGE);

    const newState = companiesSlice.reducer(
        INITIAL_STATE,
        companiesFetchingError(actionPayload.message),
    );

    expect(newState.isLoading).toBe(false);
    expect(newState.error).equal(CUSTOM_ERROR_MESSAGE);
});

test('setCheckedCompany should update state correctly', () => {
    const actionPayload = ['11', '2', '3'];

    const newState = companiesSlice.reducer(INITIAL_STATE, setCheckedCompany(actionPayload));
    expect(newState.checked).deep.equal(actionPayload);
});

test('addCompany should update state correctly', () => {
    const newState = companiesSlice.reducer(INITIAL_STATE, addCompany(COMPANY));
    expect(newState.data).deep.equal([COMPANY]);
});

test('removeCompany should update state correctly', () => {
    const initialState = {
        ...INITIAL_STATE,
        data: [COMPANY, { ...COMPANY, id: '2', name: 'Toyota' }],
    };
    const actionPayload = ['11'];

    const newState = companiesSlice.reducer(initialState, removeCompany(actionPayload));

    expect(newState.data).deep.equal([{ id: '2', name: 'Toyota', address: 'Stasova' }]);
});

test('updateCompany should update state correctly', () => {
    const initialState = {
        ...INITIAL_STATE,
        data: [COMPANY, { ...COMPANY, id: '2', name: 'Toyota' }],
    };
    const actionPayload = ['11'];

    const newState = companiesSlice.reducer(initialState, removeCompany(actionPayload));

    expect(newState.data).deep.equal([{ id: '2', name: 'Toyota', address: 'Stasova' }]);
});
