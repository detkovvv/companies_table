import React, {
    type ChangeEvent,
    type FC,
    type KeyboardEventHandler,
    useEffect,
    useRef,
    useState,
} from 'react';


type TableCellProps = {
    rowId: string;
    columnId: string;
    children: string;
    editable: boolean;
    onChangeCell?: (value: { rowId: string; columnId: string; value: string | number }) => void;
};

export const TableCell: FC<TableCellProps> = ({
                                                  children,
                                                  editable,
                                                  rowId,
                                                  columnId,
                                                  onChangeCell
                                              }) => {

    const [showInput, setShowInput] = useState(false);
    const [inputState, setInputState] = useState(children);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (showInput) (inputRef.current as HTMLInputElement).focus();
    }, [showInput]);

    const handleClick = () => {
        if (editable) setShowInput(!showInput);
    };

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            console.log(onChangeCell);
            // onChangeCell?.({ rowId, columnId, value: event.currentTarget.value });
            (inputRef.current as HTMLInputElement).blur();
            if (editable) setShowInput(!showInput);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setInputState(e.currentTarget.value);


    return (
        <td onClick={handleClick}>
            {showInput ? (
                <input
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                    value={inputState}
                />
            ) : (
                children
            )}
        </td>
    );
};
