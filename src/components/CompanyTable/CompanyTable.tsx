import { type FC } from 'react';

import { type CompanyFullType } from '../../utils/types';
import { CompanyForm } from '../Forms/CompanyForm';
import { Table } from '../Table/Table';

export const CompanyTable: FC<{ onChoose: () => void, data: CompanyFullType[], onChange: () => void }> = ({
                                                                                                              onChoose,
                                                                                                              data,
                                                                                                              onChange,
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
                name={'companies'}
                onChange={onChange}
                onChoose={onChoose}
                onClick={(id, key) => () => console.log(id, key)}
                order={order}
                withAction
            />
        </div>
    );
};
