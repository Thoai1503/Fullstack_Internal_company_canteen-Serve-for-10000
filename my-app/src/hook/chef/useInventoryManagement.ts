import { inventoryQuery } from "@/query/inventory";
import { useQuery } from "@tanstack/react-query";

export const useInventoryManagement = () => {
  const { data: inventoryList } = useQuery(inventoryQuery.list);
  return { inventoryList };
};
