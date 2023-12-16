import { useState, useEffect } from 'react';

import { useMainCheckbox } from './useMainCheckbox';

// хук для управления логикой чекбоксов
export const useTable = (
    body: Array<unknown>,
    handleChange?: (value: string[]) => void
) => {
    // тут будет храниться массив выбранных айдишников
    const [checkList, setCheckList] = useState<string[]>([]);

    const { mainCheckboxRef, setChecked, setIndeterminate, setUnchecked } =
        useMainCheckbox();

    const handleChangeCheckList = (value: string[]) => {
        setCheckList(value);
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
