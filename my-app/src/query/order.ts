import { getAllFoodType } from "@/service/foodType";
import { getAllOrder } from "@/service/order";
import { queryOptions } from "@tanstack/react-query";

export const orderQuery = {
  list: (query: string) =>
    queryOptions({
      queryKey: ["order", query],
      queryFn: () => getAllOrder(query),
    }),
};
