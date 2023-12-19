import { type FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import style from './EmployeesTable.module.css';
import {
    employeesFetching,
    removeEmployee,
    updateEmployee,
} from '../../store/reducers/EmployeesSlice';
import { useAppSelector } from '../../utils/hooks/reduxHooks';
import { type OnChangeCellValue } from '../../utils/types';
import { EmployeeForm } from '../Forms/EmployeeForm';
import { Loading } from '../Loading/Loading';
import { Table } from '../Table/Table';

export const EmployeesTable: FC = () => {
    const companiesData = useAppSelector((store) => store.companies.data);
    const selectedCompanyId = useAppSelector((state) => state.companies.checked);

    const employeesData = useAppSelector((state) => state.employees.data);
    const isLoading = useAppSelector((state) => state.employees.isLoading);
    const selectedEmployeesId = useAppSelector((state) => state.employees.checked);

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

    if (isLoading) return <Loading />;
    if (employeesData.length === 0) return null;

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
