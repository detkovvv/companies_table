import { type FC, useEffect, useRef, useState } from 'react';

type HeadType = {
    title: string;
    id: string;
    key: string;
};

type BodyType = {
    name: string;
    staff: string;
    address: string;
    id: string;
};

type TableProps = {
    head: HeadType[];
    body: BodyType[];
    order: string[];
    withAction?: boolean;
};
export const Table: FC<TableProps> = ({ head, body, order, withAction = false }) => {
    const sortedHead = order.map((i) => {
        return head.find((item) => item.key === i) as (typeof head)[0];
    });

    // массив выбранных айдишников
    const [checkList, setCheckList] = useState<string[]>([]);
    const mainCheckBoxRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!mainCheckBoxRef.current) return;
        if (checkList.length === body.length) {
            mainCheckBoxRef.current.checked = true;
        }
        if (checkList.length === 0) {
            mainCheckBoxRef.current.checked = false;
        }
        if (checkList.length > 0 && checkList.length < body.length) {
            mainCheckBoxRef.current.indeterminate = true;
        }
    }, [checkList.length, body.length]);

    const handleChangeCheckboxes = (id: string) => () => {
        if (checkList.includes(id)) {
            setCheckList(checkList.filter((i) => i !== id));
        } else {
            setCheckList([...checkList, id]);
        }
    };

    const handleChangeMainCheckbox = () => {
        if (checkList.length === body.length) {
            setCheckList([]);
        }
        if (checkList.length === 0) {
            setCheckList(body.map((i) => i.id));
        }
        if (checkList.length > 0 && checkList.length < body.length) {
            setCheckList([]);
        }
    };

    return (
        <div>
            <table>
                <thead>
                {withAction && (
                    <th>
                        <input
                            onChange={handleChangeMainCheckbox}
                            ref={mainCheckBoxRef}
                            type='checkbox'
                        />
                    </th>
                )}
                {sortedHead.map((i) => (
                    <th key={i.id}>{i.title}</th>
                ))}
                </thead>
                <tbody>
                {body.map((item, ind) => (
                    <tr key={item.id}>
                        {withAction && (
                            <td>
                                <input
                                    checked={checkList.includes(item.id)}
                                    onChange={handleChangeCheckboxes(item.id)}
                                    type='checkbox'
                                />
                            </td>
                        )}
                        {order.map((key) => (
                            <td key={key}>{body[ind][key]}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};