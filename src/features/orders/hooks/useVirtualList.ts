import { useEffect, useMemo, useRef, useState } from "react";

interface VirtualListOptions {
    rowHeight: number;
    // visibleRows: number; //removed so that it calculates the height dynamically
    overscan: number;
}

export const useVirtualList = <T>(
    items: T[] = [],
    options: VirtualListOptions,
) => {
    const { rowHeight, overscan } = options;

    const [scrollTop, setScrollTop] = useState(0);
    const [containerHeight, setContainerHeight] = useState(612);

    const containerRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const container = containerRef.current;
        if (container == null) return;

        //This prevents layout thrashing and ensures  smooth scrolling by skipping redundant calculations between frames.

        function onScroll() {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
                //scroll top should not be negative
                // Clamp to 0 to handle Safari's negative elastic bounce

                const safeScroll = Math.max(0, container?.scrollTop ?? 0);
                setScrollTop(safeScroll);
            });
        }
        container.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            container.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    // dynamically track container height — handles mobile, resize, split screen

    useEffect(() => {
        const container = containerRef.current;
        if (container == null) return;

        const observer = new ResizeObserver(([entry]) => {
            setContainerHeight(entry.contentRect.height);
        });

        observer.observe(container);

        return () => observer.disconnect();
    }, []);

    //edge case:if user filters the list using search and the list length is reduced so dynamically update
    //Search/Filter Safety: Prevents "Ghosting" when list length reduces.
    // If the current scroll position exceeds the new total list height
    //(e.g., after a search filter), we snap the scroll back to the top.

    useEffect(() => {
        const maxScroll = items.length * rowHeight;
        if (scrollTop > maxScroll && containerRef.current) {
            containerRef.current.scrollTop = 0;
        }
    }, [items.length, rowHeight]);

    //Not adding scrollTop since it will trigger again and again when it will change which can lag the ui

    const { visibleItems, spacerAbove, spacerBelow, startIndex } = useMemo(() => {
        const totalHeight = items.length * rowHeight;

        //double check so that calculations inside useMemo are also safe

        const safeScroll = Math.min(Math.max(0, scrollTop), totalHeight);
        const visibleRows = Math.ceil(containerHeight / rowHeight);
        const firstRow = Math.floor(safeScroll / rowHeight);
        const startIndex = Math.max(0, firstRow - overscan);
        const endIndex = Math.min(items.length, firstRow + visibleRows + overscan);

        return {
            visibleItems: items.slice(startIndex, endIndex),
            spacerAbove: startIndex * rowHeight,
            spacerBelow: (items.length - endIndex) * rowHeight,
            startIndex,
        };
    }, [scrollTop, containerHeight, items, rowHeight, overscan]);

    return {
        visibleItems,
        spacerAbove,
        spacerBelow,
        startIndex,
        containerRef,
    };
};
