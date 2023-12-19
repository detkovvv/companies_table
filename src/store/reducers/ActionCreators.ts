import {
    companiesFetching,
    companiesFetchingError,
    companiesFetchingSuccess,
} from './CompaniesSlice';
import { companiesList } from '../../utils/companiesList';
import { arrayInsertEmployees, arrayInsertId } from '../../utils/tableHelpers';
import { type CompanyFullType, type CompanyType } from '../../utils/types';
import { type AppDispatch } from '../store';

export const fetchCompanies = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(companiesFetching());
        const promise = new Promise((resolve) => {
            setTimeout(() => {
                resolve(companiesList);
            }, 2000);
        });
        const data = (await promise) as CompanyType[];
        const mockData: CompanyFullType[] = arrayInsertEmployees(arrayInsertId(data)).map(
            (item) => ({
                ...item,
                employees: arrayInsertId(item.employees),
            }),
        );
        dispatch(companiesFetchingSuccess(mockData));
    } catch (error) {
        dispatch(companiesFetchingError((error as Error).message));
    }
};
