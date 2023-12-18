import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './reduxHooks';
import { useMainCheckbox } from './useMainCheckBox';
import { setCheckedCompany } from '../../store/reducers/CompaniesSlice';
import { setCheckedEmployee } from '../../store/reducers/EmployeesSlice';


export const useTable = (
    body: Array<unknown>,
    tableName: string,
    handleChange?: (value: string[]) => void,
) => {
    const checkList: string[] = useAppSelector(state => state[tableName].checked);
    const dispatch = useAppDispatch();

    const { mainCheckboxRef, setChecked, setIndeterminate, setUnchecked } =
        useMainCheckbox();

    const handleChangeCheckList = (value: string[]) => {
        if(tableName === 'companies') dispatch(setCheckedCompany(value));
        if(tableName === 'employees') dispatch(setCheckedEmployee(value));
        handleChange?.(value);
    };
    console.log(checkList);

    useEffect(() => {
        if (!mainCheckboxRef.current) return;
        if (checkList.length === body.length) {
            setChecked();
        }
        if (checkList.length === 0) {
            setUnchecked();
        }
        if (checkList.length > 0 && checkList.length < body.length) {
            setIndeterminate();
        }
    }, [checkList.length, body.length]);

    const handleChangeCheckboxes = (id: string) => () => {
        if (checkList.includes(id)) {
            handleChangeCheckList(checkList.filter((i: string) => i !== id));
        } else {
            handleChangeCheckList([...checkList, id]);
        }
    };

    const handleChangeMainCheckbox = () => {
        if (checkList.length === body.length) {
            handleChangeCheckList([]);
        }
        if (checkList.length === 0) {
            handleChangeCheckList(body.map((i) => i.id));
        }
        if (checkList.length > 0 && checkList.length < body.length) {
            handleChangeCheckList([]);
        }
    };

    return {
        handleChangeMainCheckbox,
        handleChangeCheckboxes,
        mainCheckboxRef,
        checkList,
    };
};
