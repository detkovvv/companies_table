import { type FC, useCallback, useRef } from 'react';

import { useFixedSizeList } from '../../utils/hooks/useFixedSizeList';
import { useTable } from '../../utils/hooks/useTable';
import { getHeaderFromObject } from '../../utils/tableHelpers';

type TableProps = {
    head: object;
    body: Array<object>;
    order: string[];
    withAction?: boolean;
    onChoose?: (value: string[]) => void;
    openAddElementField: () => void;
};

export const Table: FC<TableProps> = ({
                                          head,
                                          body,
                                          order,
                                          withAction = false,
                                          onChoose,
                                          openAddElementField,
                                      }) => {
    const sortedHead = getHeaderFromObject({ order, head });

    const {
        mainCheckboxRef,
        handleChangeMainCheckbox,
        checkList,
        handleChangeCheckboxes,
    } = useTable(body, onChoose);

    const scrollElementRef = useRef<HTMLDivElement>(null);
    const containerHeight = 600;
    const itemHeight = 40;

    const { virtualItems, totalHeight } = useFixedSizeList({
        itemHeight: itemHeight,
        itemsCount: body.length,
        listHeight: containerHeight,
        getScrollElement: useCallback(() => scrollElementRef.current, []),
    });

    return (
        <div ref={scrollElementRef}
             style={{ height: containerHeight, overflow: 'auto', border: '1px solid lightgrey' }}>
            <div style={{ height: totalHeight }}>
                <button onClick={openAddElementField}>Добавить новый элемент таблицы</button>
                <table style={{ width: '100%' }}>
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
                    <div />
                    <tbody style={{ position: 'relative' }}>
                    {virtualItems.map((virtualItem, ind) => {
                        const item = body[virtualItem.index]!;
                        return (
                            <tr key={item.id} style={{
                                height: itemHeight,
                                position: 'absolute',
                                top: 0,
                                transform: `translateY(${virtualItem.offsetTop}px)`,
                            }}>
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
                        );
                    })}
                    </tbody>
                </table>
            </div>

        </div>
    );
};
