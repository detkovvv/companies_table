import { type FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchCompanies } from '../../store/reducers/ActionCreators';
import {  updateCompany } from '../../store/reducers/CompaniesSlice';

export const customId = () => {
    return Math.floor(Math.random() * 1000000);
}

export const CompaniesList: FC = () => {
    const companies = useAppSelector((state => state.companies.companies));
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(fetchCompanies());
   },[])

    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

    const handleCheckboxChange = (company: string) => {
        if (selectedCompanies.includes(company.name)) {
            setSelectedCompanies(selectedCompanies.filter(name => name !== company.name));
        } else {
            setSelectedCompanies([...selectedCompanies, company.name]);
        }
    };

    const handleSelectAll = () => {
        if (selectedCompanies.length === companies.length) {
            setSelectedCompanies([]);
        } else {
            setSelectedCompanies(companies.map(company => company.name));
        }
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
                        key={customId()}
                        onClick={() => handleCheckboxChange(company.name)}
                    >
                        <td>
                            <input
                                checked={selectedCompanies.includes(company.name)}
                                onChange={() => handleCheckboxChange(company.name)}
                                type="checkbox"
                            />
                        </td>
                        <td onBlur={(e) => handleCompanyFieldChange(company.name, 'name', e.currentTarget.innerText)}>{company.name}</td>
                        <td>{company.employees.length}</td>
                        <td onBlur={(e) => handleCompanyFieldChange(company.name, 'address', e.currentTarget.innerText)}>{company.address}</td>
                    </tr>
                  ))}
                </tbody>
            </table>
        </div>
    );
};