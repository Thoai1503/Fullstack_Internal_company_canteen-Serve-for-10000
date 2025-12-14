import { orderQuery } from "@/query/order";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface FilterProps {
  start_date: Date | null;
  end_date: Date | null;
  min_amount: number | null;
  max_amount: number | null;
  sort_by: "date" | "amount";
  sort_order: "asc" | "desc";
  status: "all" | "1" | "2" | "3";
}

export const useOrderPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  console.log("Pathname: " + pathname);
  const searchParams = useSearchParams();
  console.log("Search Params: " + searchParams.toString());

  const [filters, setFilters] = useState<FilterProps>({
    start_date: null,
    end_date: null,
    min_amount: null,
    max_amount: null,
    sort_by: "date",
    sort_order: "desc",
    status: "all",
  });

  const statusOptions = [
    { label: "Tất cả", value: "all" },
    { label: "Đang thanh toán", value: "1" },
    { label: "Đã thanh toán", value: "2" },
    { label: "Đã huỷ", value: "3" },
  ];

  const getQueryString = () => {
    return Object.entries(filters)
      .map(([key, value]) => {
        if (!value || value === "all") return "";
        if (value instanceof Date) {
          return `${key}=${value.getUTCDate()}-${
            value.getUTCMonth() + 1
          }-${value.getUTCFullYear()}`;
        }
        return `${key}=${value}`;
      })
      .filter(Boolean)
      .join("&");
  };

  // Initialize filters from URL on mount
  useEffect(() => {
    const urlFilters: Partial<FilterProps> = {};
    let hasUrlParams = false;

    const startDate = searchParams.get("start_date");
    const endDate = searchParams.get("end_date");
    const minAmount = searchParams.get("min_amount");
    const maxAmount = searchParams.get("max_amount");
    const sortBy = searchParams.get("sort_by");
    const sortOrder = searchParams.get("sort_order");
    const status = searchParams.get("status");

    if (startDate) {
      urlFilters.start_date = new Date(startDate);
      hasUrlParams = true;
    }
    if (endDate) {
      urlFilters.end_date = new Date(endDate);
      hasUrlParams = true;
    }
    if (minAmount) {
      urlFilters.min_amount = Number(minAmount);
      hasUrlParams = true;
    }
    if (maxAmount) {
      urlFilters.max_amount = Number(maxAmount);
      hasUrlParams = true;
    }
    if (sortBy) {
      urlFilters.sort_by = sortBy as "date" | "amount";
      hasUrlParams = true;
    }
    if (sortOrder) {
      urlFilters.sort_order = sortOrder as "asc" | "desc";
      hasUrlParams = true;
    }
    if (status) {
      urlFilters.status = status as "all" | "1" | "2" | "3";
      hasUrlParams = true;
    }

    // If URL has params, use them
    if (hasUrlParams) {
      setFilters((prev) => ({ ...prev, ...urlFilters }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // Update URL whenever filters change (after initial mount)
  useEffect(() => {
    const queryString = getQueryString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

    // Use window.history to avoid the router mounting issue
    window.history.replaceState(null, "", newUrl);
  }, [filters, pathname]);

  const queryString = useMemo(() => getQueryString(), [filters]);
  console.log("Current Filters: " + queryString);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    //   alert("Name: " + name + " Value: " + value);
    setFilters((prev) => ({
      ...prev,
      [name]:
        name === "start_date" || name === "end_date"
          ? value
            ? new Date(value).getTime()
            : null
          : name === "min_amount" || name === "max_amount"
          ? value
            ? Number(value)
            : null
          : value,
    }));
  };

  const {
    data: orderList,
    isLoading,
    error,
    refetch,
  } = useQuery({
    ...orderQuery.list(queryString),
    // The query key includes queryString, so it will refetch when queryString changes
  });

  // Helper to update filters
  const updateFilter = <K extends keyof FilterProps>(
    key: K,
    value: FilterProps[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      start_date: null,
      end_date: null,
      min_amount: null,
      max_amount: null,
      sort_by: "date",
      sort_order: "asc",
      status: "2",
    });
  };

  return {
    orderList,
    filters,
    setFilters,
    updateFilter,
    resetFilters,
    handleChange,
    statusOptions,
    isLoading,
    error,
  };
};
