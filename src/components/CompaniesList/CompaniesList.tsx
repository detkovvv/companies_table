import { type FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { type Company, updateCompany } from '../../store/reducers/CompaniesSlice';

export const CompaniesList: FC = () => {
    const companies = useSelector((state: { companies: Company[] }) => state.companies);
    const dispatch = useDispatch();

    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

    const handleCheckboxChange = (companyName: string) => {
        if (selectedCompanies.includes(companyName)) {
            setSelectedCompanies(selectedCompanies.filter(name => name !== companyName));
        } else {
            setSelectedCompanies([...selectedCompanies, companyName]);
        }
        dispatch(setSelectedCompany(companyName));
    };

    const handleSelectAll = () => {
        if (selectedCompanies.length === companies.length) {
            setSelectedCompanies([]);
        } else {
            setSelectedCompanies(companies.map(company => company.name));
        }
        dispatch(setSelectedCompany(''));
    };

    const handleCompanyFieldChange = (companyName: string, field: string, value: string) => {
        dispatch(updateCompany({ name: companyName, field, value }));
    };

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>
                        <input checked={selectedCompanies.length === companies.length} onChange={handleSelectAll} type="checkbox" />
                    </th>
                    <th>Название компании</th>
                    <th>Кол-во сотрудников</th>
                    <th>Адрес</th>
                </tr>
                </thead>
                <tbody>
                {companies.map(company => (
                    <tr
                        key={company.name}
                        onClick={() => handleCheckboxChange(company.name)}
                        style={{ backgroundColor: company.selected ? 'lightgray' : 'white' }}
                    >
                        <td>
                            <input
                                checked={selectedCompanies.includes(company.name)}
                                onChange={() => handleCheckboxChange(company.name)}
                                type="checkbox"
                            />
                        </td>
                        <td contentEditable onBlur={(e) => handleCompanyFieldChange(company.name, 'name', e.currentTarget.innerText)}>{company.name}</td>
                        <td>{company.employees.length}</td>
                        <td contentEditable onBlur={(e) => handleCompanyFieldChange(company.name, 'address', e.currentTarget.innerText)}>{company.address}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {/* Кнопки добавления/удаления компаний и обновления счетчика сотрудников */}
            {/* ... */}
        </div>
    );
};