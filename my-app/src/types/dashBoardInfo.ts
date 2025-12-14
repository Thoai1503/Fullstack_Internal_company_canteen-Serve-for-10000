import { Order } from "./order";

export interface DashBoardInfo {
  total: number;
  orders: Order[];
  total_count: number;
  cancel_count: number;
  completed_count: number;
  statistics: Map<string, number>;
  statisticByFoodType: Map<string, number>;
}
