// Infinite scroll with intersection observer
import { useRef, useEffect, useState } from "react";

function IScrollList({ fetchMore, hasMore }) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  useEffect(() => {
    if (!hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  useEffect(() => {
    setLoading(true);
    fetchMore(page).then((newItems) => {
      setItems((prev) => [...prev, ...newItems]);
      setLoading(false);
    });
  }, [page, fetchMore]);

  return (
    <div>
      {items.map((item, idx) => (
        <div key={idx}>{item}</div>
      ))}
      {hasMore && <div ref={loaderRef}>Loading more...</div>}
    </div>
  );
}