import { useEffect } from 'react';

import style from './CommonTable.module.css';
import { fetchCompanies } from '../../store/reducers/ActionCreators';
import { removeCompany, updateCompany } from '../../store/reducers/CompaniesSlice';
import { removeEmployee, updateEmployee } from '../../store/reducers/EmployeesSlice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks';
import { CompanyTable } from '../CompanyTable/CompanyTable';
import { EmployeesTable } from '../EmployeesTable/EmployeesTable';
import { Loading } from '../Loading/Loading';

type OnChangeCell = {
    rowId: string;
    columnId: string;
    value: string | number;
};

export const CommonTable = () => {
    const companiesData = useAppSelector((store) => store.companies.data);
    const isLoading = useAppSelector((store) => store.companies.isLoading);
    const selectedCompanyId = useAppSelector((state) => state.companies.checked);
    const selectedEmployeesId = useAppSelector((state) => state.employees.checked);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCompanies());
    }, []);

    const handleRemoveCompany = () => {
        dispatch(removeCompany(selectedCompanyId));
    };

    const handleRemoveEmployee = () => {
        dispatch(removeEmployee(selectedEmployeesId));
    };

    if (isLoading) {
        return <Loading />;
    }
    const onChangeCompaniesCell = (obj: OnChangeCell) => {
        dispatch(updateCompany(obj));
    };
    const onChangeEmployeesCell = (obj: OnChangeCell) => {
        dispatch(updateEmployee(obj));
    };

    return (
        <div className={style.table_wrapper}>
            <CompanyTable
                data={companiesData}
                handleRemoveCompany={handleRemoveCompany}
                onChangeCell={onChangeCompaniesCell}
            />
            <EmployeesTable
                handleRemoveEmployee={handleRemoveEmployee}
                onChangeCell={onChangeEmployeesCell}
            />
        </div>
    );
};
