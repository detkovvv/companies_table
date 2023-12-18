import { type FC, useMemo } from 'react';

import { type CompanyFullType } from '../../utils/types';
import { EmployeeForm } from '../Forms/EmployeeForm';
import { Table } from '../Table/Table';

type EmployeesTableProps = {
    currentCompany: string[];
    data: Array<CompanyFullType>;
    onChoose: (value: string[]) => void;
    onChange: (value: string[]) => void;
};

export const EmployeesTable: FC<EmployeesTableProps> = ({ currentCompany, data, onChange, onChoose }) => {

    const head = {
        surname: 'Фамилия',
        name: 'Имя',
        position: 'Должность',
    };
    const order = ['surname', 'name', 'position'];
    const editableColumns = ['surname', 'name', 'position'];

    const employeesData = useMemo(() => {
        if (!currentCompany || currentCompany.length !== 1) return [];

        return data.find(({ id }) => currentCompany.includes(id)).employees || [];
    }, [currentCompany, data]);

    if (currentCompany.length !== 1) return null;

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <EmployeeForm />
            <Table
                body={employeesData}
                editableColumns={editableColumns}
                head={head}
                name={'employees'}
                onChange={onChange}
                onChoose={onChoose}
                order={order}
                withAction
            />
        </div>

    );
};
