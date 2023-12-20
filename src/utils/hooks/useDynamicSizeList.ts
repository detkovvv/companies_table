import { useLayoutEffect, useMemo, useState } from 'react';

type Key = string | number;

interface UseDynamicSizeListProps {
    itemsCount: number;
    itemHeight?: (index: number) => number;
    estimateItemHeight?: (index: number) => number;
    getItemKey: (index: number) => Key;
    overScan?: number;
    getScrollElement: () => HTMLElement | null;
}

interface DynamicSizeListItem {
    key: Key;
    index: number;
    offsetTop: number;
    height: number;
}

const DEFAULT_OVERSCAN = 3;

const validateProps = (props: UseDynamicSizeListProps) => {
    const { itemHeight, estimateItemHeight } = props;

    if (!itemHeight && !estimateItemHeight) {
        throw new Error('you must pass either "itemHeight" or "estimateItemHeight" prop');
    }
};

export const useDynamicSizeList = (props: UseDynamicSizeListProps) => {
    validateProps(props);

    const {
        itemHeight,
        estimateItemHeight,
        getItemKey,
        itemsCount,
        overScan = DEFAULT_OVERSCAN,
        getScrollElement,
    } = props;

    const [listHeight, setListHeight] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);

    useLayoutEffect(() => {
        const scrollElement = getScrollElement();

        if (!scrollElement) return;

        const resizeObserver = new ResizeObserver(([entry]) => {
            if (!entry) return;

            const height =
                entry.borderBoxSize[0]?.blockSize ?? entry.target.getBoundingClientRect().height;

            setListHeight(height);
        });

        resizeObserver.observe(scrollElement);

        return () => {
            resizeObserver.disconnect();
        };
    }, [getScrollElement]);

    useLayoutEffect(() => {
        const scrollElement = getScrollElement();

        if (!scrollElement) return;

        const handleScroll = () => {
            const scrollTop = scrollElement.scrollTop;

            setScrollTop(scrollTop);
        };

        handleScroll();

        scrollElement.addEventListener('scroll', handleScroll);

        return () => scrollElement.removeEventListener('scroll', handleScroll);
    }, [getScrollElement]);

    const { virtualItems, totalHeight } = useMemo(() => {
        const getItemHeight = (index: number) => {
            return itemHeight ? itemHeight(index) : estimateItemHeight!(index);
        };

        const rangeStart = scrollTop;
        const rangeEnd = scrollTop + listHeight;

        let totalHeight = 0;
        let startIndex = -1;
        let endIndex = -1;
        const allRows: DynamicSizeListItem[] = Array(itemsCount);

        for (let index = 0; index < itemsCount; index++) {
            const key = getItemKey(index);
            const row = {
                key,
                index: index,
                height: getItemHeight(index),
                offsetTop: totalHeight,
            };

            totalHeight += row.height;
            allRows[index] = row;

            if (startIndex === -1 && row.offsetTop + row.height > rangeStart) {
                startIndex = Math.max(0, index - overScan);
            }

            if (endIndex === -1 && row.offsetTop + row.height >= rangeEnd) {
                endIndex = Math.min(itemsCount - 1, index + overScan);
            }
        }

        const virtualRows = allRows.slice(startIndex, endIndex === -1 ? itemsCount : endIndex + 1);
        return { virtualItems: virtualRows, totalHeight };
    }, [scrollTop, overScan, listHeight, itemHeight, getItemKey, estimateItemHeight, itemsCount]);

    return { virtualItems, totalHeight };
};
