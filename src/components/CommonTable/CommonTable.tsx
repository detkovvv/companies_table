import { useEffect, useState } from 'react';

import { fetchCompanies } from '../../store/reducers/ActionCreators';
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
        const result = data.filter(({ id }) => !companyList.includes(id));
        setCompanyList([]);
    };

    const handleRemoveEmployee = () => {
        const result = data.map((item) => {
            if (item.id !== companyList[0]) return item;
            return {
                ...item,
                employees: item.employees.filter(
                    (emp) => !employeeList.includes(emp.id),
                ),
            };
        });
        setEmployeeList([]);
    };

    if(isLoading){
        return(
            <div style={{display: 'flex'}}>...isLoading</div>
        )
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'start' }}>
            <CompanyTable data={data} onChoose={onChooseCompany} />
            <EmployeesTable
                currentCompany={companyList}
                data={data}
                onChoose={onChooseEmployee}
            />
            <div>
                {!!companyList.length && (
                    <button onClick={handleRemoveCompany}>
                        Удалить: ({companyList.length}) компанию(и)
                    </button>
                )}
                {!!employeeList.length && (
                    <button onClick={handleRemoveEmployee}>
                        Удалить: ({employeeList.length}) сотрудника(ов)
                    </button>
                )}
            </div>

        </div>
    );
};
