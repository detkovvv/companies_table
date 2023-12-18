import { type FC } from 'react';

import { type CompanyFullType } from '../../utils/types';
import { CompanyForm } from '../Forms/CompanyForm';
import { Table } from '../Table/Table';

export const CompanyTable: FC<{
    onChoose: (value: string[]) => void,
    data: CompanyFullType[],
    onChangeCell: (value: { rowId: string; columnId: string; value: string | number })=>void
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

    const body = data.map(({ name, staff, address, id }) => ({
        name,
        staff,
        address,
        id,
    }));

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <CompanyForm />
            <Table
                body={body}
                editableColumns={editableColumns}
                head={head}
                order={order}
                // onClick={(id, key) => () => console.log(id, key)}
                withAction
                tableName={'companies'}
                // onChange={onChangeCell}
                onChoose={onChoose}
            />
        </div>
    );
};
