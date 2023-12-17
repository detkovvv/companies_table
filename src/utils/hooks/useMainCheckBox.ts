import { useRef, useCallback } from 'react';

export const useMainCheckbox = () => {
    const mainCheckboxRef = useRef<HTMLInputElement>(null);

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
