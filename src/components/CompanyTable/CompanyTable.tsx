import {CompanyForm} from '../Forms/CompanyForm';
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
        address,
        id,
    }));

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <CompanyForm />
            <Table
                body={body}
                head={head}
                name={'companies'}
                onChange={onChange}
                onChoose={onChoose}
                onClick={(id, key)=>()=>console.log(id, key)}
                order={order}
                withAction
            />
        </div>
    );
};


