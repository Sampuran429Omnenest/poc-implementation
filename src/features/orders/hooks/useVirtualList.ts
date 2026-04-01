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
  const [containerHeight, setContainerHeight] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // ✅ Scroll handler
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function onScroll() {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const safeScroll = Math.max(0, container!.scrollTop);
        setScrollTop(safeScroll);
      });
    }

    container.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ✅ FIX 1: Immediate height measurement + ResizeObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 🔥 IMPORTANT: measure immediately
    const measure = () => {
      const height = container.getBoundingClientRect().height;
      if (height > 0) {
        setContainerHeight(height);
      }
    };

    measure(); // <-- THIS FIXES INITIAL BLANK ISSUE

    const observer = new ResizeObserver(() => {
      measure();
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  // ✅ Reset scroll if list shrinks
  useEffect(() => {
    const maxScroll = items.length * rowHeight;
    if (scrollTop > maxScroll && containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [items.length, rowHeight]);

  // ✅ FIX 2: guard against 0 height
  const {
    visibleItems,
    spacerAbove,
    spacerBelow,
    startIndex,
  } = useMemo(() => {
    const totalHeight = items.length * rowHeight;

    const safeScroll = Math.min(Math.max(0, scrollTop), totalHeight);

    // 🔥 CRITICAL FIX
    const effectiveHeight = containerHeight || 1; // prevent divide by 0
    const visibleRows = Math.ceil(effectiveHeight / rowHeight);

    const firstRow = Math.floor(safeScroll / rowHeight);

    const startIndex = Math.max(0, firstRow - overscan);
    const endIndex = Math.min(
      items.length,
      firstRow + visibleRows + overscan
    );

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
