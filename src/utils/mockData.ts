import { companiesList } from './companiesList';
import { arrayInsertId, arrayInsertEmployees } from './tableHelpers';


export const mockData = arrayInsertEmployees(
    arrayInsertId(companiesList)
).map((item) => ({
    ...item,
    employees: arrayInsertId(item.employees),
}));
