import { type FC } from 'react';

import { getHeaderFromObject } from '../../utils/tableHelpers';
import { useTable } from '../../utils/useTable';

type TableProps = {
    head: object;
    body: Array<object>;
    order: string[];
    withAction?: boolean;
    onChoose?: (value: string[]) => void;
};

export const Table: FC<TableProps> = ({
                                          head,
                                          body,
                                          order,
                                          withAction = false,
                                          onChoose,
                                      }) => {
    const sortedHead = getHeaderFromObject({ order, head });

    const {
        mainCheckboxRef,
        handleChangeMainCheckbox,
        checkList,
        handleChangeCheckboxes,
    } = useTable(body, onChoose);

    return (
        <div>
            <table>
                <thead>
                {withAction && (
                    <th>
                        <input
                            onChange={handleChangeMainCheckbox}
                            ref={mainCheckboxRef}
                            type="checkbox"
                        />
                    </th>
                )}
                {sortedHead.map((i) => (
                    <th key={i.key}>{i.title}</th>
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
                                    type="checkbox"
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
