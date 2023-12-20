import { type FC, useEffect } from 'react';

import style from './CompanyTable.module.css';
import { fetchCompanies } from '../../store/reducers/ActionCreators';
import {
    checkedCompaniesSelector,
    companiesSelector,
    loadingCompaniesSelector,
    removeCompany,
    updateCompany,
} from '../../store/reducers/CompaniesSlice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks';
import { type OnChangeCellValue } from '../../utils/types';
import { CompanyForm } from '../Forms/CompanyForm';
import { Loading } from '../Loading/Loading';
import { Table } from '../Table/Table';

export const CompanyTable: FC = () => {
    const selectedCompanyId = useAppSelector(checkedCompaniesSelector);
    const isLoading = useAppSelector(loadingCompaniesSelector);
    const data = useAppSelector(companiesSelector);
    const order = ['name', 'staff', 'address'];
    const editableColumns = ['name', 'address'];
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCompanies());
    }, []);

    const onChangeCompaniesCell = (obj: OnChangeCellValue) => {
        dispatch(updateCompany(obj));
    };

    const handleRemoveCompany = () => {
        dispatch(removeCompany(selectedCompanyId));
    };

    const head = {
        name: 'Название компании',
        staff: 'Кол-во сотрудников',
        address: 'Адрес',
    };

    if (isLoading) return <Loading />;

    return (
        <div className={style.company_table_container}>
            <CompanyForm />
            <Table
                body={data}
                editableColumns={editableColumns}
                head={head}
                onChangeCell={onChangeCompaniesCell}
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
