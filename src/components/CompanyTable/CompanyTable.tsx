
import { Table } from '../Table/Table';

export const CompanyTable = ({ onChoose, data, onChange }) => {
    const order = ['name', 'staff', 'address'];

    const head = {
        name: 'Название компании',
        staff: 'Кол-во сотрудников',
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
