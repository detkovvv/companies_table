import { type FC, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { updateEmployee } from '../../store/reducers/EmployeesSlice';

export const EmployeesList: FC = () => {
    const companies = useAppSelector((state => state.companies));
    const employees = useAppSelector((state => state.employees));
    const dispatch = useAppDispatch();

    const selectedCompany = companies.find(company => company.selected);

    const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

    const handleCheckboxChange = (employeeId: string) => {
        if (selectedEmployees.includes(employeeId)) {
            setSelectedEmployees(selectedEmployees.filter(id => id !== employeeId));
        } else {
            setSelectedEmployees([...selectedEmployees, employeeId]);
        }
    };

    const handleSelectAll = () => {
        setSelectedEmployees([]);
    };

    const handleEmployeeFieldChange = (employeeId: string, field: string, value: string) => {
        dispatch(updateEmployee({ id: employeeId, field, value }));
    };

    return (
        <div>
            {selectedCompany && (
                <table>
                    <thead>
                    <tr>
                        <th>
                            <input checked={selectedEmployees.length === 0} onChange={handleSelectAll} type="checkbox" />
                        </th>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Должность</th>
                    </tr>
                    </thead>
                    <tbody>
                    {selectedCompany.employees.map(employee => (
                        <tr key={employee.id} style={{ backgroundColor: selectedEmployees.includes(employee.id) ? 'lightgray' : 'white' }}>
                            <td>
                                <input
                                    checked={selectedEmployees.includes(employee.id)}
                                    onChange={() => handleCheckboxChange(employee.id)}
                                    type="checkbox"
                                />
                            </td>
                            <td contentEditable onBlur={(e) => handleEmployeeFieldChange(employee.id, 'surname', e.currentTarget.innerText)}>{employee.surname}</td>
                            <td contentEditable onBlur={(e) => handleEmployeeFieldChange(employee.id, 'name', e.currentTarget.innerText)}>{employee.name}</td>
                            <td contentEditable onBlur={(e) => handleEmployeeFieldChange(employee.id, 'position', e.currentTarget.innerText)}>{employee.position}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            {/* Кнопки добавления/удаления сотрудников */}
            {/* ... */}
        </div>
    );
};