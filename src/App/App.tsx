import './App.css';
import React from 'react';
import { Provider } from 'react-redux';

import { CommonTable } from '../components/CommonTable/CommonTable';
import { store } from '../store/store';

export const App = () => {

    return (
        <Provider store={store}>
           <CommonTable />
        </Provider>

    );
};


