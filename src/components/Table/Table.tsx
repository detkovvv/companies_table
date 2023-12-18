import { type FC, useCallback, useRef } from 'react';

import { TableCell } from './TableCell';
import { useFixedSizeList } from '../../utils/hooks/useFixedSizeList';
import { useTable } from '../../utils/hooks/useTable';
import { getHeaderFromObject } from '../../utils/tableHelpers';

type TableProps = {
    head: object;
    body: Array<object>;
    order: string[];
    editableColumns: string[];
    onChangeCell?: (value: { rowId: string; columnId: string; value: string | number }) => void;
    withAction?: boolean;
    onChoose?: (value: string[]) => void;
    onClick?: (id: string, key: string) => () => void;
    name: string;
};

export const Table: FC<TableProps> = ({
                                          head,
                                          body,
                                          order,
                                          withAction = false,
                                          editableColumns,
                                          onChangeCell,
                                          onChoose,
                                          onClick,
                                          name,
                                      }) => {
    const sortedHead = getHeaderFromObject({ order, head });

    const {
        mainCheckboxRef,
        handleChangeMainCheckbox,
        checkList,
        handleChangeCheckboxes,
    } = useTable(body, onChoose, name);

    const scrollElementRef = useRef<HTMLDivElement>(null);
    const containerHeight = 600;
    const itemHeight = 50;

    const { virtualItems, totalHeight } = useFixedSizeList({
        itemHeight: itemHeight,
        itemsCount: body.length,
        listHeight: containerHeight,
        scrollElementRef: scrollElementRef,
    });

    return (
        <div ref={scrollElementRef}
             style={{ height: containerHeight, overflowX: 'hidden', overflowY: 'auto', border: '1px solid lightgrey' }}>
            <div style={{ height: totalHeight }}>
                <table>
                    <thead>
                    {withAction && (
                        <th>
                            <input
                                onChange={handleChangeMainCheckbox}
                                ref={mainCheckboxRef}
                                type='checkbox'
                            />
                        </th>
                    )}
                    {sortedHead.map((i) => (
                        <th key={i.key}>{i.title}</th>
                    ))}
                    </thead>
                    <tbody style={{ position: 'relative' }}>
                    {virtualItems.map((virtualItem, ind) => {
                        const item = body[virtualItem.index]!;
                        return (
                            <tr
                                key={item.id}
                                style={{
                                    height: itemHeight,
                                    position: 'absolute',
                                    top: 0,
                                    transform: `translateY(${virtualItem.offsetTop}px)`,
                                 }}
                            >
                                {withAction && (
                                    <td>
                                        <input
                                            checked={checkList.includes(item.id)}
                                            onChange={handleChangeCheckboxes(item.id)}
                                            type='checkbox'
                                        />
                                    </td>
                                )}
                                {order.map((key) => {
                                    const currentElem = body[ind];
                                    return (
                                        <TableCell
                                            columnId={key}
                                            editable={editableColumns.includes(key)}
                                            key={key}
                                            onChange={onChangeCell}
                                            rowId={item.id}
                                        >
                                            {currentElem[key as keyof typeof currentElem]}
                                        </TableCell>
                                    );
                                })}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

        </div>
    );
};
