import { useState, useEffect, useRef, FC } from "react";
import { ScrollArea, Input, Loader, CloseButton, Button } from "@mantine/core";

const fetchData = async ({
  searchTerm,
  page,
  apiUrl,
}: {
  apiUrl: string;
  searchTerm: string;
  page: number;
}): Promise<any[]> => {
  const itemsPerPage = 10;
  const response = await fetch(
    `${apiUrl}?q=${searchTerm}&page=${page}&limit=${itemsPerPage}`
  );
  const { data } = await response.json();
  return data;
};

const InfiniteScroll = ({
  renderRow,
  apiUrl,
  disabled,
}: {
  apiUrl: string;
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
      const newItems = await fetchData({
        searchTerm: debouncedSearchTerm,
        page,
        apiUrl,
      });
      setItems((prev) => [...prev, ...newItems]);
      setLoading(false);
      setHasMore(newItems.length > 0);
    };

    loadMoreItems();

    return () => {
      controller.abort();
    };
  }, [page, debouncedSearchTerm]);

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
