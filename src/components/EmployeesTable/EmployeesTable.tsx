import { type FC, useEffect } from 'react';

import { employeesFetching } from '../../store/reducers/EmployeesSlice';
import { useAppSelector } from '../../utils/hooks/reduxHooks';
import { type CompanyFullType } from '../../utils/types';
import { EmployeeForm } from '../Forms/EmployeeForm';
import { Table } from '../Table/Table';

type EmployeesTableProps = {
    companyList: string[];
    data: CompanyFullType[];
    onChoose: (value: string[]) => void;
};

export const EmployeesTable: FC<EmployeesTableProps> = ({
                                                            companyList,
                                                            data,
                                                            onChoose,
                                                        }) => {

    const employeesData = useAppSelector(state => state.employees.data);
    const isLoading = useAppSelector(state => state.employees.isLoading);

    const head = {
        surname: 'Фамилия',
        name: 'Имя',
        position: 'Должность',
    };
    const order = ['surname', 'name', 'position'];
    const editableColumns = ['surname', 'name', 'position'];

    useEffect(()=>{
        const currentCompany = data.filter(company => company.id === companyList[0]);
        employeesFetching(currentCompany.employees);
        console.log(currentCompany);
    },[])

    if (isLoading) {
        return <div style={{ display: 'flex' }}>...isLoading</div>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <EmployeeForm />
            <Table
                body={employeesData}
                editableColumns={editableColumns}
                head={head}
                onChoose={onChoose}
                order={order}
                tableName={'employees'}
                withAction
            />
        </div>
    );
};
