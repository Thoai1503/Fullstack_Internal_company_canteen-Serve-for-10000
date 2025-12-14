import http from "@/lib/http";
import { FoodType } from "@/types/foodType";

export const getAllFoodType = async (): Promise<FoodType[]> => {
  return await http
    .get("/foodtype")
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
