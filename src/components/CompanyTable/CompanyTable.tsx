import { Table } from '../Table/Table';

// этот компонент умный (называется smart-component) он управляет тем, какие данные идут в тупой компонент
export const CompanyTable = ({ onChoose, data, onChange }) => {
    const order = ['name', 'staff', 'address'];

    const head = {
        staff: 'Кол-во сотрудников',
        name: 'Название компании',
        address: 'Адрес',
    };

    const body = data.map(({ name, staff, address, id }) => ({
        name,
        staff,
        address: address,
        id,
    }));

    return (
        <Table
            body={body}
            head={head}
            onChange={onChange}
            onChoose={onChoose}
            order={order}
            withAction
        />
    );
};
