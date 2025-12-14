import { FoodItem } from "./foodItem";

export interface CartItem {
  id: number;
  food: FoodItem;
  food_id: number;
  quantity: number;
  cart_id: number;
}
