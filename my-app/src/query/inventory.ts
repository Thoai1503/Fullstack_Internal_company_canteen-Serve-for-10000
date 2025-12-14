import { getAllFoodType } from "@/service/foodType";
import { getAllInventoryItem } from "@/service/inventory";
import { getAllOrder } from "@/service/order";
import { queryOptions } from "@tanstack/react-query";

export const inventoryQuery = {
  list: queryOptions({
    queryKey: ["inventory"],
    queryFn: () => getAllInventoryItem(),
  }),
};
