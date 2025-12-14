"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Package,
  DollarSign,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { useInventoryManagement } from "@/hook/chef/useInventoryManagement";
import InventoryItem from "./InventoryItem";
import { useInventoryItemMutation } from "@/hook/chef/useInventoryItemMutation";
import { IngredientInventory } from "@/types/ingredientInventory";
import {
  CButton,
  CToast,
  CToastBody,
  CToaster,
  CToastHeader,
} from "@coreui/react";

// Types
interface BaseUnit {
  id: number;
  name: string;
}

interface Ingredient {
  id: number;
  name: string;
  base_unit_id: number;
  base_unit_name?: string;
  stock: number;
  price_per_unit: number;
}

const InventoryManagement = () => {
  // Mock data
  const { inventoryList } = useInventoryManagement();
  const [toast, addToast] = useState<any>();
  const toaster = useRef(null);
  const exampleToast = (message = "default") => (
    <CToast>
      <CToastHeader closeButton>
        <svg
          className="rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
        >
          <rect width="100%" height="100%" fill="#007aff"></rect>
        </svg>
        <div className="fw-bold me-auto">CoreUI for React.js</div>
        <small>7 min ago</small>
      </CToastHeader>
      <CToastBody>{message}</CToastBody>
    </CToast>
  );
  const { updateStock } = useInventoryItemMutation((message: string) => {
    addToast(exampleToast(message));
  });
  const baseUnits: BaseUnit[] = [
    { id: 1, name: "kg" },
    { id: 2, name: "lít" },
    { id: 3, name: "gói" },
    { id: 4, name: "hộp" },
    { id: 5, name: "chai" },
  ];

  const [ingredients, setIngredients] = useState<IngredientInventory[]>(
    inventoryList || []
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<
    "add" | "edit" | "delete" | "adjust"
  >("add");
  const [selectedIngredient, setSelectedIngredient] =
    useState<IngredientInventory | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    base_unit_id: 1,
    stock: 0,
    price_per_unit: 0,
  });

  const [adjustmentData, setAdjustmentData] = useState({
    type: "in",
    quantity: 0,
    note: "",
  });

  // Calculations
  const totalValue = useMemo(
    () =>
      inventoryList?.reduce(
        (sum, item) => sum + item.stock * item.price_per_unit,
        0
      ),
    [inventoryList]
  );
  const totalItems = useMemo(() => inventoryList?.length, [inventoryList]);
  const lowStockItems = ingredients.filter((item) => item.stock < 10).length;

  // Filter ingredients
  const filteredIngredients = ingredients.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers
  const handleOpenModal = (
    type: "add" | "edit" | "delete" | "adjust",
    ingredient?: IngredientInventory
  ) => {
    console.log("Ingredient: " + JSON.stringify(ingredient));
    setModalType(type);
    if (ingredient) {
      setSelectedIngredient(ingredient);
      if (type === "edit") {
        setFormData({
          name: ingredient.name,
          base_unit_id: ingredient.base_unit_id,
          stock: ingredient.stock,
          price_per_unit: ingredient.price_per_unit,
        });
      }
    } else {
      setFormData({ name: "", base_unit_id: 1, stock: 0, price_per_unit: 0 });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedIngredient(null);
    setFormData({ name: "", base_unit_id: 1, stock: 0, price_per_unit: 0 });
    setAdjustmentData({ type: "in", quantity: 0, note: "" });
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    if (modalType === "add") {
      const newIngredient: IngredientInventory = {
        id: Math.max(...ingredients.map((i) => i.id), 0) + 1,
        ...formData,

        units: {
          id: 0,
          name:
            baseUnits.find((u) => u.id === formData.base_unit_id)?.name || "",
          conversion_factors: 0,
        },
      };
      setIngredients([...ingredients, newIngredient]);
    } else if (modalType === "edit" && selectedIngredient) {
      setIngredients(
        ingredients.map((item) =>
          item.id === selectedIngredient.id
            ? {
                ...item,
                ...formData,
                base_unit_name: baseUnits.find(
                  (u) => u.id === formData.base_unit_id
                )?.name,
              }
            : item
        )
      );
    } else if (modalType === "adjust" && selectedIngredient) {
      // alert("data: " + JSON.stringify(adjustmentData));
      const newStock =
        adjustmentData.type === "in"
          ? selectedIngredient.stock + adjustmentData.quantity
          : selectedIngredient.stock - adjustmentData.quantity;

      updateStock({ id: selectedIngredient.id, stock: newStock });
    }

    handleCloseModal();
  };

  const handleDelete = () => {
    if (selectedIngredient) {
      setIngredients(
        ingredients.filter((item) => item.id !== selectedIngredient.id)
      );
      handleCloseModal();
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  return (
    <div
      className="container-fluid py-4"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      <div className="row mb-4">
        <div className="col">
          <h2 className="mb-0">
            <Package
              className="me-2"
              size={32}
              style={{ verticalAlign: "middle" }}
            />
            Quản lý kho nguyên liệu
          </h2>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1">Tổng giá trị kho</p>
                  <h4 className="mb-0">{formatCurrency(totalValue!)}</h4>
                </div>
                <div className="bg-primary bg-opacity-10 p-3 rounded">
                  <DollarSign className="text-primary" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1">Tổng số mặt hàng</p>
                  <h4 className="mb-0">{totalItems}</h4>
                </div>
                <div className="bg-success bg-opacity-10 p-3 rounded">
                  <TrendingUp className="text-success" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1">Sắp hết hàng</p>
                  <h4 className="mb-0">{lowStockItems}</h4>
                </div>
                <div className="bg-warning bg-opacity-10 p-3 rounded">
                  <AlertTriangle className="text-warning" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Add */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-8">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <Search size={20} />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Tìm kiếm nguyên liệu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4 text-end">
              <button
                className="btn btn-primary"
                onClick={() => handleOpenModal("add")}
              >
                <Plus size={20} className="me-2" />
                Thêm nguyên liệu
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div
            className="table-responsive"
            style={{ maxHeight: "65vh", overflowY: "auto" }}
          >
            <table className="table table-hover mb-0">
              <thead className="table-light table-light sticky-top">
                <tr>
                  <th>ID</th>
                  <th>Tên nguyên liệu</th>
                  <th>Đơn vị</th>
                  <th>Tồn kho</th>
                  <th>Giá/Đơn vị</th>
                  <th>Tổng giá trị</th>
                  <th>Trạng thái</th>
                  <th className="text-end">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {inventoryList?.map((item, index) => {
                  return (
                    <InventoryItem
                      key={index}
                      item={item}
                      handleOpenModal={handleOpenModal}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <>
          <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {modalType === "add" && "Thêm nguyên liệu mới"}
                    {modalType === "edit" && "Chỉnh sửa nguyên liệu"}
                    {modalType === "delete" && "Xác nhận xóa"}
                    {modalType === "adjust" && "Điều chỉnh tồn kho"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
                  ></button>
                </div>

                {modalType === "delete" ? (
                  <>
                    <div className="modal-body">
                      <p>
                        Bạn có chắc chắn muốn xóa nguyên liệu{" "}
                        <strong>{selectedIngredient?.name}</strong>?
                      </p>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCloseModal}
                      >
                        Hủy
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleDelete}
                      >
                        Xóa
                      </button>
                    </div>
                  </>
                ) : modalType === "adjust" ? (
                  <>
                    <div className="modal-body">
                      <div className="alert alert-info">
                        <strong>{selectedIngredient?.name}</strong>
                        <br />
                        Tồn kho hiện tại:{" "}
                        <strong>
                          {selectedIngredient?.stock}{" "}
                          {selectedIngredient?.units.name}
                        </strong>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Loại điều chỉnh</label>
                        <select
                          className="form-select"
                          value={adjustmentData.type}
                          onChange={(e) =>
                            setAdjustmentData({
                              ...adjustmentData,
                              type: e.target.value as "in" | "out",
                            })
                          }
                        >
                          <option value="in">Nhập kho</option>
                          <option value="out">Xuất kho</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Số lượng</label>
                        <input
                          type="number"
                          name="stock"
                          className="form-control"
                          step="0.01"
                          min="0"
                          value={adjustmentData.quantity}
                          onChange={(e) =>
                            setAdjustmentData({
                              ...adjustmentData,
                              quantity: parseFloat(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Ghi chú</label>
                        <textarea
                          className="form-control"
                          rows={3}
                          value={adjustmentData.note}
                          onChange={(e) =>
                            setAdjustmentData({
                              ...adjustmentData,
                              note: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCloseModal}
                      >
                        Hủy
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                      >
                        Xác nhận
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label className="form-label">Tên nguyên liệu *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Đơn vị *</label>
                        <select
                          className="form-select"
                          value={formData.base_unit_id}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              base_unit_id: parseInt(e.target.value),
                            })
                          }
                        >
                          {baseUnits.map((unit) => (
                            <option key={unit.id} value={unit.id}>
                              {unit.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Tồn kho *</label>
                        <input
                          type="number"
                          className="form-control"
                          step="0.01"
                          min="0"
                          value={formData.stock}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              stock: parseFloat(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Giá/Đơn vị (VNĐ) *</label>
                        <input
                          type="number"
                          className="form-control"
                          step="1000"
                          min="0"
                          value={formData.price_per_unit}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              price_per_unit: parseFloat(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCloseModal}
                      >
                        Hủy
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                      >
                        {modalType === "add" ? "Thêm" : "Cập nhật"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="modal-backdrop show"></div>
        </>
      )}

      <CToaster
        className="p-3"
        placement="top-end"
        push={toast}
        ref={toaster}
      />
    </div>
  );
};

export default InventoryManagement;
