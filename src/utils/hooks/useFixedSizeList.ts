import { type RefObject, useEffect, useLayoutEffect, useMemo, useState } from 'react';

interface UseFixedSizeListProps {
    itemsCount: number;
    itemHeight: (index: number) => number;
    // listHeight: number;
    overScan?: number;
    scrollingDelay?: number;
    scrollElementRef: RefObject<HTMLElement>;
}

const DEFAULT_OVERSCAN = 3;
const DEFAULT_SCROLLING_DELAY = 150;

export const useFixedSizeList = (props: UseFixedSizeListProps) => {
    const {
        itemHeight,
        itemsCount,
        scrollingDelay = DEFAULT_SCROLLING_DELAY,
        overScan = DEFAULT_OVERSCAN,
        // listHeight,
        scrollElementRef,
    } = props;

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

    const { virtualItems, startIndex, endIndex, totalHeight } = useMemo(() => {
        const rangeStart = scrollTop;
        const rangeEnd = scrollTop + listHeight;
        let totalHeight = 0;
        let startIndex = -1;
        let endIndex = -1;
        const allRows = Array(itemsCount);

        for (let index = 0; index < itemsCount; index++) {
            const row = {
                index: index,
                height: itemHeight(index),
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
    }, [scrollTop, overScan, listHeight, itemsCount]);

    return {
        virtualItems,
        totalHeight,
        startIndex,
        endIndex,
        isScrolling,
    };
};
