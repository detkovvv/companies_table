import { type FC } from 'react';

import { useAppSelector } from '../../hooks/reduxHooks';
import { Table } from '../Table/Table';

export const EmployeesList: FC = () => {
    const { companies, isLoading } = useAppSelector((state => state.companies));

    const head = [
        {
            title: 'Фамилия',
            id: crypto.randomUUID(),
            key: 'surname',
        },
        {
            title: 'Имя',
            id: crypto.randomUUID(),
            key: 'name',
        },
        {
            title: 'Должность',
            id: crypto.randomUUID(),
            key: 'position',
        },
    ] as const;

    const order = ['surname', 'name', 'position'];

    const body = companies[0].employees.map(({ surname, name, position }) => ({
        surname,
        name,
        position,
        id: crypto.randomUUID(),
    }));

    return (
        isLoading? <div>...Loading</div> : <Table body={body} head={head} order={order} withAction />
    )
};