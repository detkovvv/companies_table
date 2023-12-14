import './App.css';
import { Provider } from 'react-redux';

import { MainPage } from '../Pages/MainPage/MainPage';
import { store } from '../store/store';

export const App = () => {

    return (
        <Provider store={store}>
            <MainPage />
        </Provider>

    );
};


