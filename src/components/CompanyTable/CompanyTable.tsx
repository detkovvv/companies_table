import { type FC } from 'react';

import { type CompanyFullType } from '../../utils/types';
import { CompanyForm } from '../Forms/CompanyForm';
import { Table } from '../Table/Table';

export const CompanyTable: FC<{
    onChoose: (value: string[]) => void,
    data: CompanyFullType[],
}> = ({
          onChoose,
          data,
      }) => {

    const order = ['name', 'staff', 'address'];
    const editableColumns = ['name', 'address'];

    const head = {
        name: 'Название компании',
        staff: 'Кол-во сотрудников',
        address: 'Адрес',
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <CompanyForm />
            <Table
                body={data}
                editableColumns={editableColumns}
                head={head}
                onChoose={onChoose}
                order={order}
                tableName={'companies'}
                withAction
            />
        </div>
    );
};
