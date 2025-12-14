import http from "@/lib/http";
import { FoodItem } from "@/types/foodItem";

export const createNewFood = async (food: any): Promise<FoodItem> => {
  return await http
    .post("/fooditem", food)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const uploadByFoodId = async (
  id: number,
  food: any
): Promise<boolean> => {
  return await http
    .post(`/fooditem/upload/${id}`, food, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
