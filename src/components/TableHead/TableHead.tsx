import React, { type FC, type RefObject } from 'react';

import style from '../TableHead/TableHead.module.css';

type TableHeadProps = {
    sortedHead: { title: never; key: string }[];
    handleChangeMainCheckbox: () => void;
    mainCheckboxRef: RefObject<HTMLInputElement>;
    withAction?: boolean;
};

export const TableHead: FC<TableHeadProps> = ({
    sortedHead,
    handleChangeMainCheckbox,
    mainCheckboxRef,
    withAction,
}) => {
    return (
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
    );
};
