import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { companiesSlice } from './reducers/CompaniesSlice';


const rootReducer = combineReducers({
    companies: companiesSlice.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};

export const store = setupStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
