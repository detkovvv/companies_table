import { companiesSlice, Company } from './CompaniesSlice';
import { companiesList } from '../companiesList';
import { type AppDispatch } from '../store';


export const fetchCompanies = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(companiesSlice.actions.companiesFetching());
        const promise = new Promise((resolve)=>{
            setTimeout(() => {
                resolve(companiesList);
            }, 2000);
        })
        const data = await promise
        dispatch(companiesSlice.actions.companiesFetchingSuccess(data));
    } catch (e){
        dispatch(companiesSlice.actions.companiesFetchingError(error.message));
    }
};