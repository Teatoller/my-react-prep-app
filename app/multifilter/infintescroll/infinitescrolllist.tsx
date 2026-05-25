import { useEffect, useRef, useState, type ReactNode } from "react";

interface InfiniteScrollItem {
  value: ReactNode;
}

interface InfiniteScrollListProps {
  fetchMoreData: () => Promise<InfiniteScrollItem[]>;
  hasMore: boolean;
}

export function InfiniteScrollList({
  fetchMoreData,
  hasMore,
}: Readonly<InfiniteScrollListProps>) {
  const [items, setItems] = useState<InfiniteScrollItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState<number>(1);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (lastItemRef.current) observer.current.observe(lastItemRef.current);
    }, [hasMore, loading]);

    useEffect(() => {
        if (page === 1) return;
        setLoading(true);
        fetchMoreData().then(newItems => {
            setItems(prevItems => [...prevItems, ...newItems]);
            setLoading(false);
        });
    }, [page, fetchMoreData]);

  return (
    <div>
      <h1>Infinite Scroll List</h1>
      {items.map((item, idx) => (
        <div key={idx} ref={idx === items.length - 1 ? lastItemRef : null}>
          {item.value}
        </div>
      ))}
      {hasMore && <div ref={loaderRef}>Loading...</div>}
    </div>
  );
}