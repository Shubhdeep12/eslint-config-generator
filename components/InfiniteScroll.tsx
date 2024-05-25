"use client";
import { useState, useEffect, useRef } from "react";
import { ScrollArea, Input, CloseButton, Button } from "@mantine/core";

const InfiniteScroll = ({
  renderRow,
  getData,
  disabled,
  limit = 10,
}: {
  getData: (p: any) => any;
  limit?: number;
  renderRow: (p: any, b: any) => any;
  disabled?: boolean;
}) => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();

    const loadMoreItems = async () => {
      setLoading(true);
      const { data } = getData({
        query: debouncedSearchTerm,
        page,
        limit,
      });
      setItems((prev) => [...prev, ...data]);
      setLoading(false);
      setHasMore(data.length > 0);
    };

    loadMoreItems();

    return () => {
      controller.abort();
    };
  }, [page, debouncedSearchTerm, getData, limit]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setDebouncedSearchTerm(event.target.value);
      setItems([]);
      setPage(1);
      setHasMore(true);
    }, 500);
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setItems([]);
    setPage(1);
    setHasMore(true);
  };

  return (
    <div>
      <Input
        placeholder="Search rules..."
        value={searchTerm}
        onChange={handleSearch}
        mb="md"
        disabled={disabled}
        rightSectionPointerEvents="all"
        rightSection={
          <CloseButton
            aria-label="Clear input"
            onClick={handleResetSearch}
            style={{ display: searchTerm ? undefined : "none" }}
          />
        }
      />
      <ScrollArea style={{ height: "60vh" }}>
        {items.map((item, index) => renderRow(item, disabled))}
        {hasMore && (
          <Button
            disabled={loading || disabled}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Fetch more
          </Button>
        )}
      </ScrollArea>
    </div>
  );
};

export default InfiniteScroll;
