import { type FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import style from './EmployeesTable.module.css';
import { checkedCompaniesSelector, companiesSelector } from '../../store/reducers/CompaniesSlice';
import {
    checkedEmployeesSelector,
    employeesFetching,
    employeesSelector,
    loadingEmployeesSelector,
    removeEmployee,
    updateEmployee,
} from '../../store/reducers/EmployeesSlice';
import { useAppSelector } from '../../utils/hooks/reduxHooks';
import { type CompanyFullType, type OnChangeCellValue } from '../../utils/types';
import { EmployeeForm } from '../Forms/EmployeeForm';
import { Loading } from '../Loading/Loading';
import { Table } from '../Table/Table';

export const EmployeesTable: FC = () => {
    const companiesData: CompanyFullType[] = useAppSelector(companiesSelector);
    const selectedCompanyId = useAppSelector(checkedCompaniesSelector);

    const employeesData = useAppSelector(employeesSelector);
    const isLoading = useAppSelector(loadingEmployeesSelector);
    const selectedEmployeesId = useAppSelector(checkedEmployeesSelector);

    const dispatch = useDispatch();

    const handleRemoveEmployee = () => {
        dispatch(removeEmployee(selectedEmployeesId));
    };

    const onChangeEmployeesCell = (value: OnChangeCellValue) => {
        dispatch(updateEmployee(value));
    };

    const head = {
        surname: 'Фамилия',
        name: 'Имя',
        position: 'Должность',
    };
    const order = ['surname', 'name', 'position'];
    const editableColumns = ['surname', 'name', 'position'];

    useEffect(() => {
        const currentCompany = companiesData.find((company) => company.id === selectedCompanyId[0]);
        if (currentCompany) dispatch(employeesFetching(currentCompany.employees));
    }, [selectedCompanyId]);

    if (selectedCompanyId.length !== 1) return null;
    if (isLoading) return <Loading />;

    return (
        <div className={style.employees_table_container}>
            <EmployeeForm />
            <Table
                body={employeesData}
                editableColumns={editableColumns}
                head={head}
                onChangeCell={onChangeEmployeesCell}
                order={order}
                tableName={'employees'}
                withAction
            />
            {!!selectedEmployeesId.length && (
                <button onClick={handleRemoveEmployee}>
                    Удалить: ({selectedEmployeesId.length}) сотрудника(ов)
                </button>
            )}
        </div>
    );
};
