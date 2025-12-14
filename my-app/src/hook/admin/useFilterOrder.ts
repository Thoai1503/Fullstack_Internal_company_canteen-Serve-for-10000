import { useState } from "react";

interface FilterProps {
  start_date: Date | null;
  end_date: Date | null;
  min_amount: number | null;
  max_amount: number | null;
  sort_by: "date" | "amount";
  sort_order: "asc" | "desc";
  status: "all" | "1" | "2" | "3";
}
export const useFilterOrder = () => {
  const [filters, setFilters] = useState<FilterProps>({
    start_date: null,
    end_date: null,
    min_amount: null,
    max_amount: null,
    sort_by: "date",
    sort_order: "asc",
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
        if (!value) return "";
        // Format dates to ISO string if they're Date objects
        if (value instanceof Date) {
          return `${key}=${value.toISOString()}`;
        }
        return `${key}=${value}`;
      })
      .filter(Boolean)
      .join("&");
  };

  const queryString = getQueryString();
  console.log("Current Filters: " + queryString);

  return { statusOptions };
};
