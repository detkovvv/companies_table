import { type FC, useEffect, useRef, useState } from 'react';

import style from './Table.module.css';
import { useAppSelector } from '../../utils/hooks/reduxHooks';
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
    const rowHeight = 50;
    const visibleRows = 11;
    const [start, setStart] = useState(0);

    const getTopHeight = () => {
        return rowHeight * start;
    };
    const getBottomHeight = () => {
        return rowHeight * (body.length - (start + visibleRows + 1));
    };

    useEffect(() => {
        const scrollHandler = (e) => {
            const newStart = Math.min(
                body.length - visibleRows - 1,
                Math.floor(e.target.scrollTop / rowHeight),
            );
            setStart(newStart);
        };
        if (!scrollElementRef.current) return;
        scrollElementRef.current.addEventListener('scroll', scrollHandler);
        return () => {
            if (!scrollElementRef.current) return;
            scrollElementRef.current.removeEventListener('scroll', scrollHandler);
        };
    }, [body.length, visibleRows, rowHeight]);

    return (
        <div
            className={style.table_container}
            ref={scrollElementRef}
            style={{ height: rowHeight * visibleRows + 1 }}
        >
            <div style={{ height: getTopHeight() }} />
            <table className={style.table}>
                <thead className={style.thead}>
                    <tr style={{ height: rowHeight }}>
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
                    {body.slice(start, start + visibleRows).map((item, ind) => {
                        return (
                            <tr
                                className={style.tbody_line}
                                key={item.id}
                                style={{ height: rowHeight }}
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
            <div style={{ height: getBottomHeight() }} />
        </div>
    );
};
