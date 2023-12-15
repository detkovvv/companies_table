import './App.css';
import React from 'react';
import { Provider } from 'react-redux';

import { CompaniesList } from '../components/CompaniesList/CompaniesList';
import { EmployeesList } from '../components/EmployeesList/EmployeesList';
import { store } from '../store/store';

export const App = () => {

    return (
        <Provider store={store}>
            <CompaniesList />
            <EmployeesList />
        </Provider>

    );
};


