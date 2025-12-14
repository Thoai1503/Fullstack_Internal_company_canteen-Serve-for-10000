import { getAllFoodType } from "@/service/foodType";
import { queryOptions } from "@tanstack/react-query";

export const foodTypeQuery = {
  list: queryOptions({
    queryKey: ["food-type"],
    queryFn: () => getAllFoodType(),
  }),
};
