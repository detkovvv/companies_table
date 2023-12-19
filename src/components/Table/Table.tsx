import { type FC, useRef } from 'react';

import { TableCell } from './TableCell';
import { useAppSelector } from '../../utils/hooks/reduxHooks';
import { useFixedSizeList } from '../../utils/hooks/useFixedSizeList';
import { useTable } from '../../utils/hooks/useTable';
import { getHeaderFromObject } from '../../utils/tableHelpers';
import { type CompanyFullType, type EmployeeFullType,} from '../../utils/types';

type TableProps = (
    | {
    head: {
        name: string;
        staff: string;
        address: string;
    };
    body: CompanyFullType[];
    tableName: 'companies';
}
    | {
    head: {
        name: string;
        surname: string;
        position: string;
    };
    body: EmployeeFullType[];
    tableName: 'employees';
}
    ) & {
    order: string[];
    editableColumns: string[];
    withAction?: boolean;
    onChoose?: (value: string[]) => void;
    onChangeCell?: (value: { rowId: string; columnId: string; value: string | number }) => void;
};

export const Table: FC<TableProps> = ({
                                          head,
                                          body,
                                          order,
                                          tableName,
                                          withAction = false,
                                          editableColumns,
                                          onChoose,
                                          onChangeCell

                                      }) => {
    const sortedHead = getHeaderFromObject({ order, head });

    const { mainCheckboxRef, handleChangeMainCheckbox, handleChangeCheckboxes } =
        useTable(body, tableName, onChoose);

    const checkList: string[] = useAppSelector(state => state[tableName].checked);

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
        <div
            ref={scrollElementRef}
            style={{
                height: containerHeight,
                overflowX: 'hidden',
                overflowY: 'auto',
                border: '1px solid lightgrey',
                marginBottom: '10px'
            }}
        >
            <div style={{ height: totalHeight }}>
                <table style={{width: '100%', marginBottom:'20px'}}>
                    <thead style={{background: '#efefef'}}>
                    {withAction && (
                        <th style={{width: '20px'}}>
                            <input
                                onChange={handleChangeMainCheckbox}
                                ref={mainCheckboxRef}
                                type='checkbox'
                            />
                        </th>
                    )}
                    {sortedHead.map((i) => (
                        <th key={i.key} style={{width: '200px' , padding: '5px', border: '1px solid #dddddd'}}>{i.title}</th>
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
                                    alignItems: 'center',
                                }}
                            >
                                {withAction && (
                                    <td style={{width: '20px', border: '1px solid #dddddd'}}>
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
                                            onChangeCell={onChangeCell}
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
