import { companiesSlice } from './CompaniesSlice';
import { companiesList } from '../../utils/companiesList';
import { arrayInsertEmployees, arrayInsertId } from '../../utils/tableHelpers';
import { type AppDispatch } from '../store';


export const fetchCompanies = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(companiesSlice.actions.companiesFetching());
        const promise = new Promise((resolve)=>{
            setTimeout(() => {
                resolve(companiesList);
            }, 2000);
        })
        const data = arrayInsertEmployees(
            arrayInsertId(promise)
        ).map((item) => ({
            ...item,
            employees: arrayInsertId(item.employees),
        }));
        dispatch(companiesSlice.actions.companiesFetchingSuccess(data));
    } catch (error){
        dispatch(companiesSlice.actions.companiesFetchingError(error.message));
    }
};