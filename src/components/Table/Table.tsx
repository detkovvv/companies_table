import { type FC, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Simulate } from 'react-dom/test-utils';

import { useTable } from '../../utils/hooks/useTable';
import { getHeaderFromObject } from '../../utils/tableHelpers';

import input = Simulate.input;

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

    const containerHeight = 600;
    const itemHeight = 40;
    const totalTableHeight = itemHeight * body.length;
    const overScan = 4;
    const scrollingDelay = 100;
    const [scrollTop, setScrollTop] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollElementRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const scrollElement = scrollElementRef.current;
        if (!scrollElement) {
            return;
        }
        const handleScroll = () => {
            const scrollTop = scrollElement.scrollTop;
            setScrollTop(scrollTop);
        };
        handleScroll();
        scrollElement.addEventListener('scroll', handleScroll);

        return () => scrollElement.removeEventListener('scroll', handleScroll);
    }, [input]);

    useLayoutEffect(() => {
        const scrollElement = scrollElementRef.current;
        if (!scrollElement) {
            return;
        }
        let timeoutId: number | null = null;

        const handleScroll = () => {
            setIsScrolling(true);

            if (typeof timeoutId === 'number') {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                setIsScrolling(false);
            }, scrollingDelay);
        };
        scrollElement.addEventListener('scroll', handleScroll);

        return () => {
            if (typeof timeoutId === 'number') {
                clearTimeout(timeoutId);
            }
            scrollElement.removeEventListener('scroll', handleScroll);
        }

    }, []);


    const virtualItems = useMemo(() => {
        const rangeStart = scrollTop;
        const rangeEnd = scrollTop + containerHeight;

        let startIndex = Math.floor(rangeStart / itemHeight);
        let endIndex = Math.ceil(rangeEnd / itemHeight);

        startIndex = Math.max(0, startIndex - overScan);
        endIndex = Math.min(body.length - 1, endIndex + overScan);
        const virtualItems = [];
        for (let index = startIndex; index <= endIndex; index++) {
            virtualItems.push({
                index,
                offsetTop: index * itemHeight,
            });
        }

        return virtualItems;
    }, [scrollTop, body.length]);

    // const itemsToRender = body.slice(startIndex, endIndex + 1);

    return (
        <div ref={scrollElementRef}
             style={{ height: containerHeight, overflow: 'auto', border: '1px solid lightgrey' }}>
            <div style={{ height: totalTableHeight }}>
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
                                    <td key={key}>{isScrolling? '...Scrolling' : body[ind][key]}</td>
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
