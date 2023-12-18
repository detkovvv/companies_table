import { type FC, useMemo } from 'react';

import { employeesFetching } from '../../store/reducers/EmployeesSlice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks';
import { type CompanyFullType } from '../../utils/types';
import { EmployeeForm } from '../Forms/EmployeeForm';
import { Table } from '../Table/Table';

type EmployeesTableProps = {
    companyList: string[];
    data: CompanyFullType[];
    onChoose: (value: string[]) => void;
    onChangeCell: (value: { rowId: string; columnId: string; value: string | number }) => void
};

export const EmployeesTable: FC<EmployeesTableProps> = ({
                                                            companyList,
                                                            data,
                                                            onChoose,
                                                            onChangeCell,
                                                        }) => {
    const employeesData = useAppSelector(state => state.employees.data);
    const dispatch = useAppDispatch();

    const head = {
        surname: 'Фамилия',
        name: 'Имя',
        position: 'Должность',
    };
    const order = ['surname', 'name', 'position'];
    const editableColumns = ['surname', 'name', 'position'];

    if (companyList.length !== 1) {
        return null;
    } else{
        const currentCompany = data.filter(company => company.id === companyList[0]);
        console.log(currentCompany);
        dispatch(employeesFetching(currentCompany));
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <EmployeeForm />
            <Table
                body={employeesData}
                editableColumns={editableColumns}
                head={head}
                name={'employees'}
                onChange={onChangeCell}
                onChoose={onChoose}
                order={order}
                withAction
            />
        </div>
    );
};
