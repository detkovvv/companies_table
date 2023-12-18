import { type FC, type FormEvent } from 'react';

import { addCompany } from '../../store/reducers/CompaniesSlice';
import { useAppDispatch } from '../../utils/hooks/reduxHooks';
import { useInputValue } from '../../utils/hooks/useInput';
import { type CompanyFullType } from '../../utils/types';

export const CompanyForm: FC = () => {
    const dispatch = useAppDispatch();
    const [name, handleChangeName, clearNameField] = useInputValue();
    const [address, handleChangeAddress, clearAddressField] = useInputValue();

    const handleAddNewCompany = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newCompany: CompanyFullType = {
            name: name,
            address: address,
            employees: [],
            stuff: 0,
            id: crypto.randomUUID(),
        };
        dispatch(addCompany(newCompany));
        clearNameField();
        clearAddressField();
    };

    return (
        <form onSubmit={handleAddNewCompany} style={{ display: 'flex', height: '40px' }}>
            <input
                onChange={handleChangeName}
                placeholder='название компании'
                required
                type='text'
                value={name}
            />
            <input
                onChange={handleChangeAddress}
                placeholder='адрес компании'
                required
                type='text'
                value={address}
            />
            <button style={{ fontSize: '12px' }} type='submit'>
                добавить компанию
            </button>
        </form>
    );
};
