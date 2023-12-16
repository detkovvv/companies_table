import { useState } from 'react';

import { mockData } from '../../utils/mockData';
import { CompanyTable } from '../CompanyTable/CompanyTable';
import { EmployeesTable } from '../EmployeesTable/EmployeesTable';

export const CommonTable = () => {
    // хранит массив id выбранных компаний
    const [companyList, setCompanyList] = useState<Array<string>>([]);
    const [employeeList, setEmployeeList] = useState<Array<string>>([]);

    const [data, setData] = useState(mockData);

    const onChooseCompany = (value: string[]) => setCompanyList(value);
    const onChooseEmployee = (value: string[]) => setEmployeeList(value);
    const handleRemoveCompany = () => {
        const result = data.filter(({ id }) => !companyList.includes(id));
        setData(result);
        setCompanyList([]);
    };

    const handleRemoveEmployee = () => {
        const result = data.map((item) => {
            if (item.id !== companyList[0]) return item;
            return {
                ...item,
                employees: item.employees.filter(
                    (emp) => !employeeList.includes(emp.id)
                ),
            };
        });
        setData(result);
        setEmployeeList([]);
    };
    return (
        <>
            <CompanyTable data={data} onChoose={onChooseCompany} />
            <EmployeesTable
                currentCompany={companyList}
                data={data}
                onChoose={onChooseEmployee}
            />
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
        </>
    );
};
