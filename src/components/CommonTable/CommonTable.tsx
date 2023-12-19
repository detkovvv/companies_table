import { useEffect, useState } from 'react';

import { fetchCompanies } from '../../store/reducers/ActionCreators';
import { removeCompany, updateCompany } from '../../store/reducers/CompaniesSlice';
import { removeEmployee } from '../../store/reducers/EmployeesSlice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks';
import { CompanyTable } from '../CompanyTable/CompanyTable';
import { EmployeesTable } from '../EmployeesTable/EmployeesTable';

export const CommonTable = () => {
    const companiesData = useAppSelector((store) => store.companies.data);
    const isLoading = useAppSelector((store) => store.companies.isLoading);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCompanies());
    }, []);

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
        return <div style={{ display: 'flex' }}>...isLoading</div>;
    }
    const onChangeCompaniesCell = (obj: { rowId:string, columnId:string, value: event.curentTarget.value }) => {
        dispatch(updateCompany(obj));
    };
    const onChangeEmployeesCell = (obj: { rowId:string, columnId:string, value: event.curentTarget.value }) => {
        dispatch(updateCompany(obj));
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'start' }}>
            <div>
                <CompanyTable
                    data={companiesData}
                    onChangeCell={onChangeCompaniesCell}
                    onChoose={onChooseCompany}
                />
                {!!companyList.length && (
                    <button onClick={handleRemoveCompany}>
                        Удалить: ({companyList.length}) компанию(и)
                    </button>
                )}
            </div>
            <div>
                {companyList.length === 1 && (
                   <div>
                       <EmployeesTable
                           companyList={companyList}
                           onChangeCell={onChangeEmployeesCell}
                           onChoose={onChooseEmployee}
                       />
                       {!!employeeList.length && (
                           <button onClick={handleRemoveEmployee}>
                               Удалить: ({employeeList.length}) сотрудника(ов)
                           </button>
                       )}
                   </div>
                )}

            </div>
        </div>
    );
};
