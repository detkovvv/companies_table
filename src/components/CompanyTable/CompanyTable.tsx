import { type FC } from 'react';

import style from './CompanyTable.module.css';
import { useAppSelector } from '../../utils/hooks/reduxHooks';
import { type CompanyFullType } from '../../utils/types';
import { CompanyForm } from '../Forms/CompanyForm';
import { Table } from '../Table/Table';

export const CompanyTable: FC<{
    data: CompanyFullType[];
    handleRemoveCompany: () => void;
    onChangeCell?: (value: { rowId: string; columnId: string; value: string | number }) => void;
}> = ({ data, handleRemoveCompany, onChangeCell }) => {
    const selectedCompanyId = useAppSelector((state) => state.companies.checked);
    const order = ['name', 'staff', 'address'];
    const editableColumns = ['name', 'address'];

    const head = {
        name: 'Название компании',
        staff: 'Кол-во сотрудников',
        address: 'Адрес',
    };

    return (
        <div className={style.company_table_container}>
            <CompanyForm />
            <Table
                body={data}
                editableColumns={editableColumns}
                head={head}
                onChangeCell={onChangeCell}
                order={order}
                tableName={'companies'}
                withAction
            />
            {!!selectedCompanyId.length && (
                <button onClick={handleRemoveCompany}>
                    Удалить: ({selectedCompanyId.length}) компанию(и)
                </button>
            )}
        </div>
    );
};
