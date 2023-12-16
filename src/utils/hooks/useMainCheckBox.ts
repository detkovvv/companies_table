import { useRef, useCallback } from 'react';

// чтоб управлять главным инпутом в таблице
export const useMainCheckbox = () => {
    const mainCheckboxRef = useRef<HTMLInputElement>(null);

    // нужно использовать хендлеры именно так, потому что когда у тебя есть промежуточное состояние для чекбокса, ты должен им управлять отдельно от общего чека
    const setChecked = useCallback(() => {
        const input = mainCheckboxRef.current as HTMLInputElement;
        input.indeterminate = false;
        input.checked = true;
    }, []);

    const setIndeterminate = useCallback(() => {
        const input = mainCheckboxRef.current as HTMLInputElement;
        input.indeterminate = true;
        input.checked = false;
    }, []);

    const setUnchecked = useCallback(() => {
        const input = mainCheckboxRef.current as HTMLInputElement;
        input.indeterminate = false;
        input.checked = false;
    }, []);

    return {
        mainCheckboxRef,
        setChecked,
        setUnchecked,
        setIndeterminate,
    };
};
