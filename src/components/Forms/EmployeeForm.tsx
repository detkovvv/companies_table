import { type FC, type FormEvent } from 'react';

import { useAppDispatch } from '../../utils/hooks/reduxHooks';
import { useInputValue } from '../../utils/hooks/useInput';
import {  type EmployeeType } from '../../utils/types';

export const EmployeeForm: FC = () => {
    const dispatch = useAppDispatch();
    const [surname, handleChangeSurname, clearSurnameField] = useInputValue();
    const [name, handleChangeName, clearNameField] = useInputValue();
    const [position, handleChangePosition, clearPositionField] = useInputValue();

    const handleAddEmployee = (event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        const newEmployee: EmployeeType = {
            surname: surname,
            name: name,
            position: position,
            id: crypto.randomUUID(),
        }
        dispatch(addEmployee(newEmployee));
        clearNameField();
        clearSurnameField();
        clearPositionField();
    }

    return (
        <form onSubmit={handleAddEmployee} style={{display:'flex', height: '40px'}}>
            <input onChange={handleChangeSurname} placeholder='фамилия' required type='text' value={surname} />
            <input onChange={handleChangeName} placeholder='имя' required type='text' value={name} />
            <input onChange={handleChangePosition} placeholder='должность' required type='text' value={position} />
            <button style={{fontSize:'12px'}} type='submit'>добавить сотрудника</button>
        </form>
    )
};
