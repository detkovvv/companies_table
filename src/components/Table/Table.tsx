import { type FC, useRef } from 'react';

import style from './Table.module.css';
import { useAppSelector } from '../../utils/hooks/reduxHooks';
import { useFixedSizeList } from '../../utils/hooks/useFixedSizeList';
import { useTable } from '../../utils/hooks/useTable';
import { getHeaderFromObject } from '../../utils/tableHelpers';
import {
    type CompanyFullType,
    type EmployeeFullType,
    type OnChangeCellValue,
} from '../../utils/types';
import { TableCell } from '../TableCell/TableCell';

type TableProps = (
    | {
          head: Record<string, string>;
          body: CompanyFullType[];
          tableName: 'companies';
      }
    | {
          head: Record<string, string>;
          body: EmployeeFullType[];
          tableName: 'employees';
      }
) & {
    order: string[];
    editableColumns: string[];
    withAction?: boolean;
    onChangeCell?: (value: OnChangeCellValue) => void;
};

export const Table: FC<TableProps> = ({
    head,
    body,
    order,
    tableName,
    withAction = false,
    editableColumns,
    onChangeCell,
}) => {
    const sortedHead = getHeaderFromObject({ order, head });

    const { mainCheckboxRef, handleChangeMainCheckbox, handleChangeCheckboxes } = useTable(
        body,
        tableName,
    );

    const checkList: string[] = useAppSelector((state) => state[tableName].checked);

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
        <div className={style.table_container} ref={scrollElementRef}>
            <div style={{ height: totalHeight }}>
                <table className={style.table}>
                    <thead className={style.thead}>
                        <tr>
                            {withAction && (
                                <th className={style.th_checkbox}>
                                    <input
                                        onChange={handleChangeMainCheckbox}
                                        ref={mainCheckboxRef}
                                        type='checkbox'
                                    />
                                </th>
                            )}
                            {sortedHead.map((i) => (
                                <th className={style.th_header} key={i.key}>
                                    {i.title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className={style.tbody}>
                        {virtualItems.map((virtualItem, ind) => {
                            const item = body[virtualItem.index]!;
                            return (
                                <tr
                                    className={style.tbody_line}
                                    key={item.id}
                                    style={{ transform: `translateY(${virtualItem.offsetTop}px)` }}
                                >
                                    {withAction && (
                                        <td className={style.td_header}>
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
