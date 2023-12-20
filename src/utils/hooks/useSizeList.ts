import { type RefObject, useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';

type Key = string | number;

interface UseFixedSizeListProps {
    itemsCount: number;
    // itemHeight: (index: number) => number;
    getItemKey?: (index: number) => Key;
    estimateItemHeight?: (index: number) => number;
    // listHeight: number;
    overScan?: number;
    scrollingDelay?: number;
    scrollElementRef: RefObject<HTMLElement>;
}

const DEFAULT_OVERSCAN = 3;
const DEFAULT_SCROLLING_DELAY = 150;

function validateProps(props: UseFixedSizeListProps) {
    const { itemHeight, estimateItemHeight } = props;

    if (!itemHeight && !estimateItemHeight) {
        throw new Error('You must pass either "itemHeight" or "estimateItemHeight" prop');
    }
}

export const useSizeList = (props: UseFixedSizeListProps) => {
    validateProps(props);

    const {
        itemHeight,
        estimateItemHeight,
        getItemKey,
        itemsCount,
        scrollingDelay = DEFAULT_SCROLLING_DELAY,
        overScan = DEFAULT_OVERSCAN,
        // listHeight,
        scrollElementRef,
    } = props;

    const [measurementCash, setMeasurementCash] = useState<Record<Key, number>>();
    const [listHeight, setListHeight] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollElement = scrollElementRef.current;

    useLayoutEffect(() => {
        if (!scrollElement) {
            return;
        }
        const resizeObserver = new ResizeObserver(([entry]) => {
            if (!entry) {
                return;
            }
            const height =
                entry.borderBoxSize[0]?.blockSize ?? entry.target.getBoundingClientRect().height;
            setListHeight(height);
        });
        return () => {
            resizeObserver.disconnect();
        };
    }, [scrollElement]);

    useLayoutEffect(() => {
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
    }, []);

    useEffect(() => {
        const scrollElement = scrollElementRef.current;

        if (!scrollElement) {
            return;
        }

        let timeoutId: number | undefined;

        const handleScroll = () => {
            setIsScrolling(true);

            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                setIsScrolling(false);
            }, scrollingDelay);
        };

        scrollElement.addEventListener('scroll', handleScroll);

        return () => {
            clearTimeout(timeoutId);
            scrollElement.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const { virtualItems, startIndex, endIndex, totalHeight, allItems } = useMemo(() => {
        const getItemHeight = (index: number) => {
            if (itemHeight) {
                return itemHeight(index);
            }

            const key = getItemKey!(index);
            if (typeof measurementCash![key] === 'number') {
                return measurementCash![key];
            }

            return estimateItemHeight!(index);
        };
        const rangeStart = scrollTop;
        const rangeEnd = scrollTop + listHeight;
        let totalHeight = 0;
        let startIndex = -1;
        let endIndex = -1;
        const allRows = Array(itemsCount);

        for (let index = 0; index < itemsCount; index++) {
            const key = getItemKey!(index);
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
                endIndex = Math.max(itemsCount - 1, index + overScan);
            }
        }
        const virtualRows = allRows.slice(startIndex, endIndex - 1);
        return {
            virtualItems: virtualRows,
            startIndex,
            endIndex,
            allItems: allRows,
            totalHeight,
        };
    }, [
        scrollTop,
        overScan,
        listHeight,
        itemsCount,
        itemHeight,
        estimateItemHeight,
        measurementCash,
    ]);

    const measureElement = useCallback((element: Element | null) => {
        if (!element) {
            return;
        }
        const indexAttribute = element?.getAttribute('data-index') || '';
        const index = parseInt(indexAttribute, 10);
        if (Number.isNaN(index)) {
            console.error('dynamic elements must have a valid "data-index" attribute');
            return;
        }

        const size = element?.getBoundingClientRect();
        const key = getItemKey!(index);

        setMeasurementCash((cash) => ({ ...cash, [key]: size.height }));
    }, []);
    return {
        virtualItems,
        totalHeight,
        startIndex,
        endIndex,
        isScrolling,
        allItems,
        measureElement,
    };
};
