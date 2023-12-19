import style from './CommonTable.module.css';
import { CompanyTable } from '../CompanyTable/CompanyTable';
import { EmployeesTable } from '../EmployeesTable/EmployeesTable';

export const CommonTable = () => {
    return (
        <div className={style.table_wrapper}>
            <CompanyTable />
            <EmployeesTable />
        </div>
    );
};
