import { type FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchCompanies } from '../../store/reducers/ActionCreators';
import { Table } from '../Table/Table';




export const CompaniesList: FC = () => {
    const { companies, isLoading } = useAppSelector((state => state.companies));
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCompanies());
    }, []);

    const head = [
        {
            title: 'Название компании',
            id: crypto.randomUUID(),
            key: 'name',
        },
        {
            title: 'Кол-во сотрудников',
            id: crypto.randomUUID(),
            key: 'employees',
        },
        {
            title: 'Адрес',
            id: crypto.randomUUID(),
            key: 'address',
        },
    ] as const;

    const order = ['name', 'employees', 'address'];

    const body = companies.map(({ name, employees, address }) => ({
        name,
        employees: employees.length,
        address,
        id: crypto.randomUUID(),
    }));

    // const handleCompanyFieldChange = (companyName: string, field: string) => (event: any) => {
    //     dispatch(updateCompany({ name: companyName, field, event.currentTarget.innerText }));
    // };

    return (
        isLoading? <div>...Loading</div> : <Table body={body} head={head} order={order} withAction />
    );
};