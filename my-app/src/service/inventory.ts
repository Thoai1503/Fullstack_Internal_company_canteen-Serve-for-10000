import http from "@/lib/http";
import { IngredientInventory } from "@/types/ingredientInventory";

export const getAllInventoryItem = async (): Promise<IngredientInventory[]> => {
  return await http
    .get("/inventory")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};
export const updateInventoryStock = async (
  id: number,
  stock: number
): Promise<any> => {
  return await http
    .post(
      `/inventory/stock-update/${id}`,
      { stock: stock },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};
