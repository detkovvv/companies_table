import { type RefObject, useEffect, useLayoutEffect, useMemo, useState } from 'react';

interface UseFixedSizeListProps {
    itemsCount: number;
    itemHeight: number;
    listHeight: number;
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
        listHeight,
        scrollElementRef,
    } = props;

    const [scrollTop, setScrollTop] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);


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

    const { virtualItems, startIndex, endIndex } = useMemo(() => {
        const rangeStart = scrollTop;
        const rangeEnd = scrollTop + listHeight;

        let startIndex = Math.floor(rangeStart / itemHeight);
        let endIndex = Math.ceil(rangeEnd / itemHeight);

        startIndex = Math.max(0, startIndex - overScan);
        endIndex = Math.min(itemsCount - 1, endIndex + overScan);

        const virtualItems = [];

        for (let index = startIndex; index <= endIndex; index++) {
            virtualItems.push({
                index,
                offsetTop: index * itemHeight,
            });
        }
        return { virtualItems, startIndex, endIndex };
    }, [scrollTop, listHeight, itemsCount]);

    const totalHeight = itemHeight * itemsCount;

    return {
        virtualItems,
        totalHeight,
        startIndex,
        endIndex,
        isScrolling,
    };
};