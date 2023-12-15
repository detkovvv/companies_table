import { type FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { customId } from '../CompaniesList/CompaniesList';

export const EmployeesList: FC = ({ selectedCompany }) => {
    // const companies = useAppSelector((state => state.companies.companies));
    // const employees = selectedCompany.employees;
    // const dispatch = useAppDispatch();
    //
    // const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
    //
    // const handleCheckboxChange = (employeeId: string) => {
    //     if (selectedEmployees.includes(employeeId)) {
    //         setSelectedEmployees(selectedEmployees.filter(id => id !== employeeId));
    //     } else {
    //         setSelectedEmployees([...selectedEmployees, employeeId]);
    //     }
    // };
    //
    // const handleSelectAll = () => {
    //     setSelectedEmployees([]);
    // };
    //
    // const handleEmployeeFieldChange = (employeeId: string, field: string, value: string) => {
    //     dispatch(updateEmployee({ id: employeeId, field, value }));
    // };

    return (
        <div>
            {selectedCompany && (
                <table>
                    <thead>
                    <tr>
                        <th>
                            <input checked={selectedEmployees.length === 0} onChange={handleSelectAll}
                                   type='checkbox' />
                        </th>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Должность</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map(employee => (
                        <tr key={customId()}
                            style={{ backgroundColor: selectedEmployees.includes(employee.id) ? 'lightgray' : 'white' }}>
                            <td>
                                <input
                                    checked={selectedEmployees.includes(employee.id)}
                                    onChange={() => handleCheckboxChange(employee.id)}
                                    type='checkbox'
                                />
                            </td>
                            <td onBlur={(e) => handleEmployeeFieldChange(employee.id, 'surname', e.currentTarget.innerText)}>{employee.surname}</td>
                            <td onBlur={(e) => handleEmployeeFieldChange(employee.id, 'name', e.currentTarget.innerText)}>{employee.name}</td>
                            <td onBlur={(e) => handleEmployeeFieldChange(employee.id, 'position', e.currentTarget.innerText)}>{employee.position}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};