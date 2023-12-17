import { useEffect, useState } from 'react';

import { fetchCompanies } from '../../store/reducers/ActionCreators';
import { removeCompany } from '../../store/reducers/CompaniesSlice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks';
import { CompanyTable } from '../CompanyTable/CompanyTable';
import { EmployeesTable } from '../EmployeesTable/EmployeesTable';

export const CommonTable = () => {
    const data = useAppSelector(store => store.companies.companies);
    const isLoading = useAppSelector(store => store.companies.isLoading);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCompanies());
    }, []);

    // хранит массив id выбранных компаний
    const [companyList, setCompanyList] = useState<Array<string>>([]);
    const [employeeList, setEmployeeList] = useState<Array<string>>([]);

    const onChooseCompany = (value: string[]) => setCompanyList(value);
    const onChooseEmployee = (value: string[]) => setEmployeeList(value);

    const handleRemoveCompany = () => {
        dispatch(removeCompany(companyList));
        setCompanyList([]);
    };

    const handleRemoveEmployee = () => {
        dispatch(removeEmployee(employeeList));
        setEmployeeList([]);
    };

    if (isLoading) {
        return (
            <div style={{ display: 'flex' }}>...isLoading</div>
        );
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'start' }}>
            <div>
                {!!companyList.length && (
                    <button onClick={handleRemoveCompany}>
                        Удалить: ({companyList.length}) компанию(и)
                    </button>
                )}
                <CompanyTable data={data} onChoose={onChooseCompany} />
            </div>
            <div>
                {!!employeeList.length && (
                    <button onClick={handleRemoveEmployee}>
                        Удалить: ({employeeList.length}) сотрудника(ов)
                    </button>
                )}
                <EmployeesTable
                    currentCompany={companyList}
                    data={data}
                    onChoose={onChooseEmployee}
                />
            </div>
        </div>
    );
};
