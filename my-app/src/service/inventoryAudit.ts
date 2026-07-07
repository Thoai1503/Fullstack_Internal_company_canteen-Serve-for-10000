import http from "@/lib/http";

interface InventoryAuditParams {
  id: number;
  ingredient_id: number;
  source_id: number;
  source_type: number;
  stock_adjust: number;
  adjust_type: number;
  old_stock: number;
  new_stock: number;
  unit_price: number;
  note: string;
  created_at: string;
}

export const getAllInventoryAudit = async (
  params: any,
): Promise<InventoryAuditParams[]> => {
  const queryString = Object.entries(params)
    .filter(
      ([_, value]) => value !== undefined && value !== null && value !== "",
    )
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join("&");
  return await http
    .get(`/inventory-audit?${queryString}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};
