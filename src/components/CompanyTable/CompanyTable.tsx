import { type FC } from 'react';

import { type CompanyFullType } from '../../utils/types';
import { CompanyForm } from '../Forms/CompanyForm';
import { Table } from '../Table/Table';

export const CompanyTable: FC<{
    onChoose: (value: string[]) => void,
    data: CompanyFullType[],
    onChangeCell?: (value: { rowId: string; columnId: string; value: string | number }) => void;
}> = ({
          onChoose,
          data,
                                     onChangeCell
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
                onChangeCell={onChangeCell}
                onChoose={onChoose}
                order={order}
                tableName={'companies'}
                withAction
            />
        </div>
    );
};
