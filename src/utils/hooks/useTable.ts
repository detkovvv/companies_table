import { useEffect } from 'react';

import { useAppSelector } from './reduxHooks';
import { useMainCheckbox } from './useMainCheckBox';


export const useTable = (
    body: Array<unknown>,
    handleChange?: (value: string[]) => void,
    tableName: string,
) => {
    const checkList = useAppSelector(state => state[tableName].checked);

    const { mainCheckboxRef, setChecked, setIndeterminate, setUnchecked } =
        useMainCheckbox();

    const handleChangeCheckList = (value: string[]) => {

        handleChange?.(value);
    };

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
            handleChangeCheckList(checkList.filter((i) => i !== id));
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
