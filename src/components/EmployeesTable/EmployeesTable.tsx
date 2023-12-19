import { type FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import style from './EmployeesTable.module.css';
import { employeesFetching } from '../../store/reducers/EmployeesSlice';
import { useAppSelector } from '../../utils/hooks/reduxHooks';
import { EmployeeForm } from '../Forms/EmployeeForm';
import { Loading } from '../Loading/Loading';
import { Table } from '../Table/Table';

type EmployeesTableProps = {
    handleRemoveEmployee: () => void;
    onChangeCell?: (value: { rowId: string; columnId: string; value: string | number }) => void;
};

export const EmployeesTable: FC<EmployeesTableProps> = ({ handleRemoveEmployee, onChangeCell }) => {
    const companiesData = useAppSelector((store) => store.companies.data);
    const employeesData = useAppSelector((state) => state.employees.data);
    const isLoading = useAppSelector((state) => state.employees.isLoading);
    const selectedEmployeesId = useAppSelector((state) => state.employees.checked);
    const selectedCompanyId = useAppSelector((state) => state.companies.checked);
    const dispatch = useDispatch();

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

    if (isLoading) return null;

    return (
        selectedCompanyId.length === 1 && (
            <div className={style.employees_table_container}>
                <EmployeeForm />
                <Table
                    body={employeesData}
                    editableColumns={editableColumns}
                    head={head}
                    onChangeCell={onChangeCell}
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
        )
    );
};
