import { IngredientInventory } from "@/types/ingredientInventory";
import { AlertTriangle, Edit2, Trash2, TrendingUp } from "lucide-react";
import React, { useEffect, useState } from "react";

const InventoryItem = ({
  item,
  handleOpenModal,
}: {
  item: IngredientInventory;
  handleOpenModal: (
    st: "add" | "edit" | "delete" | "adjust",
    item: IngredientInventory
  ) => void;
}) => {
  const [ingredient, setIngredient] = useState(item);
  const totalItemValue = ingredient.stock * ingredient.price_per_unit;
  const isLowStock = ingredient.stock < (10 / 100) * ingredient.stock_limit;
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };
  useEffect(() => {
    setIngredient(item);
  }, [item]);

  return (
    <tr key={ingredient.id}>
      <td>{ingredient.id}</td>
      <td className="fw-medium">{ingredient.name}</td>
      <td>{ingredient.units.name}</td>
      <td>
        <span className={`badge ${isLowStock ? "bg-warning" : "bg-success"}`}>
          {ingredient.stock.toFixed(2)}
        </span>
      </td>
      <td>{formatCurrency(ingredient.price_per_unit)}</td>
      <td>{formatCurrency(totalItemValue)}</td>
      <td>
        {isLowStock ? (
          <span className="badge bg-warning">
            <AlertTriangle size={14} className="me-1" />
            Sắp hết
          </span>
        ) : (
          <span className="badge bg-success">Đủ hàng</span>
        )}
      </td>
      <td className="text-end">
        <div className="btn-group btn-group-sm">
          <button
            className="btn btn-outline-info"
            onClick={() => handleOpenModal("adjust", ingredient)}
            title="Điều chỉnh tồn kho"
          >
            <TrendingUp size={16} />
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => handleOpenModal("edit", ingredient)}
            title="Chỉnh sửa"
          >
            <Edit2 size={16} />
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={() => handleOpenModal("delete", ingredient)}
            title="Xóa"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default InventoryItem;
