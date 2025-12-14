import http from "@/lib/http";
import { Order } from "@/types/order";

export const getAllOrder = async (query: string): Promise<Order[]> => {
  return await http
    .get("/order?" + query)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
