import { useEffect } from 'react';

import { fetchCompanies } from '../../store/reducers/ActionCreators';
import { removeCompany, updateCompany } from '../../store/reducers/CompaniesSlice';
import { removeEmployee, updateEmployee } from '../../store/reducers/EmployeesSlice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks';
import { CompanyTable } from '../CompanyTable/CompanyTable';
import { EmployeesTable } from '../EmployeesTable/EmployeesTable';

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
        return <div style={{ display: 'flex' }}>...isLoading</div>;
    }
    const onChangeCompaniesCell = (obj: {
        rowId: string;
        columnId: string;
        value: string | number;
    }) => {
        dispatch(updateCompany(obj));
    };
    const onChangeEmployeesCell = (obj: {
        rowId: string;
        columnId: string;
        value: string | number;
    }) => {
        dispatch(updateEmployee(obj));
    };
    S;
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'start' }}>
            <div>
                <CompanyTable data={companiesData} onChangeCell={onChangeCompaniesCell} />
                {!!selectedCompanyId.length && (
                    <button onClick={handleRemoveCompany}>
                        Удалить: ({selectedCompanyId.length}) компанию(и)
                    </button>
                )}
            </div>
            <div>
                {selectedCompanyId.length === 1 && (
                    <div>
                        <EmployeesTable
                            onChangeCell={onChangeEmployeesCell}
                            selectedCompanyId={selectedCompanyId}
                        />
                        {!!selectedCompanyId.length && (
                            <button onClick={handleRemoveEmployee}>
                                Удалить: ({selectedEmployeesId.length}) сотрудника(ов)
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
