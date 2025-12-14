"use client";
import LoadingSkeleton from "@/components/common/loading/LoadingSkeleton";
import { FoodItem } from "@/types/foodItem";
import React, { Suspense, useEffect, useState, useRef } from "react";
import AddFoodModal from "./AddFoodModal";
import { useFoodPage } from "@/hook/admin/useFoodPage";
import Image from "next/image";
import FoodItems from "./FoodItem";

interface FoodListProps {
  list: FoodItem[];
}

const FoodList = ({ list }: FoodListProps) => {
  const [foodList, setFoodList] = useState<FoodItem[]>(list);
  const { handleSubmit, handleChange, foodInfo, list_data, handleFileChange } =
    useFoodPage(setFoodList);
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("Tất cả");
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000000 });
  const [filteredList, setFilteredList] = useState<FoodItem[]>(list);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Sync with prop changes
  useEffect(() => {
    setFoodList(list);
    setFilteredList(list);
  }, [list]);

  // Filter logic
  const filterFoodList = (
    search: string,
    type: string,
    price: { min: number; max: number }
  ) => {
    let filtered = [...foodList];

    if (search) {
      filtered = filtered.filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (type !== "Tất cả") {
      filtered = filtered.filter((item) => item?.name === type);
    }

    filtered = filtered.filter(
      (item) => (item.price || 0) >= price.min && (item.price || 0) <= price.max
    );

    setFilteredList(filtered);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterFoodList(value, selectedType, priceRange);
  };

  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
    filterFoodList(searchTerm, type, priceRange);
  };

  // CSV Import
  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const rows = text.split("\n").slice(1);

        alert(
          `Chuẩn bị import ${rows.length} món ăn. Tính năng này cần được kết nối với backend.`
        );
      };
      reader.readAsText(file);
    }
  };

  // CSV Export
  const handleExportCSV = () => {
    const csv = [
      ["Tên món ăn", "Loại món", "Giá"].join(","),
      ...filteredList.map((item) =>
        [item.name, item.name, item.price].join(",")
      ),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `food-list-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  // Get unique food types
  const foodTypes = ["Tất cả", ...(list_data?.map((t) => t.name) || [])];

  return (
    <div className="mt-3">
      {/* Header Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4 className="mb-1 fw-bold">
                <i className="bi bi-cup-hot-fill me-2 text-success"></i>
                Quản lý món ăn
              </h4>
              <p className="text-muted mb-0 small">
                <i className="bi bi-list-check me-1"></i>
                Tổng số:{" "}
                <span className="fw-semibold">{filteredList.length}</span> món
              </p>
            </div>
            <div className="d-flex gap-2 flex-wrap">
              <button
                className="btn btn-success d-flex align-items-center gap-2"
                onClick={handleShow}
                aria-label="Thêm món ăn mới"
              >
                <i className="bi bi-plus-circle"></i>
                Thêm món mới
              </button>
              <button
                className="btn btn-outline-primary d-flex align-items-center gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <i className="bi bi-upload"></i>
                Import CSV
              </button>
              <button
                className="btn btn-outline-secondary d-flex align-items-center gap-2"
                onClick={handleExportCSV}
              >
                <i className="bi bi-download"></i>
                Export CSV
              </button>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="row g-2">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm món ăn..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                {searchTerm && (
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleSearch("")}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                )}
              </div>
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={selectedType}
                onChange={(e) => handleTypeFilter(e.target.value)}
              >
                {foodTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => setShowFilterPanel(!showFilterPanel)}
              >
                <i className="bi bi-funnel me-1"></i>
                Lọc{" "}
                {showFilterPanel && <i className="bi bi-chevron-up ms-1"></i>}
                {!showFilterPanel && (
                  <i className="bi bi-chevron-down ms-1"></i>
                )}
              </button>
            </div>
          </div>

          {/* Advanced Filter Panel */}
          {showFilterPanel && (
            <div className="mt-3 p-3 bg-light rounded">
              <h6 className="mb-3">
                <i className="bi bi-sliders me-2"></i>
                Lọc theo khoảng giá
              </h6>
              <div className="row g-2">
                <div className="col-md-5">
                  <label className="form-label small">Giá tối thiểu (đ)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={priceRange.min}
                    onChange={(e) => {
                      const newRange = {
                        ...priceRange,
                        min: parseInt(e.target.value) || 0,
                      };
                      setPriceRange(newRange);
                      filterFoodList(searchTerm, selectedType, newRange);
                    }}
                  />
                </div>
                <div className="col-md-5">
                  <label className="form-label small">Giá tối đa (đ)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={priceRange.max}
                    onChange={(e) => {
                      const newRange = {
                        ...priceRange,
                        max: parseInt(e.target.value) || 10000000,
                      };
                      setPriceRange(newRange);
                      filterFoodList(searchTerm, selectedType, newRange);
                    }}
                  />
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button
                    className="btn btn-sm btn-outline-danger w-100"
                    onClick={() => {
                      setPriceRange({ min: 0, max: 10000000 });
                      filterFoodList(searchTerm, selectedType, {
                        min: 0,
                        max: 10000000,
                      });
                    }}
                  >
                    <i className="bi bi-arrow-clockwise me-1"></i>
                    Đặt lại
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Food List Table */}
      <div className="card shadow-sm">
        <div
          className="table-responsive"
          style={{ maxHeight: "60vh", overflowY: "auto" }}
        >
          <table className="table table-hover mb-0">
            <thead className="table-light sticky-top">
              <tr>
                <th scope="col" className="ps-4">
                  #
                </th>
                <th scope="col">Ảnh</th>
                <th scope="col">Tên món ăn</th>
                <th scope="col">Loại món</th>
                <th scope="col">Giá</th>
                <th scope="col" className="text-center">
                  Chức năng
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredList.length > 0 ? (
                filteredList.map((item, index) => (
                  <FoodItems key={item.id} item={item} index={index} />
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-5">
                    <i className="bi bi-inbox display-4 text-muted d-block mb-3"></i>
                    <p className="text-muted mb-0">
                      {searchTerm || selectedType !== "Tất cả"
                        ? "Không tìm thấy món ăn nào phù hợp"
                        : "Chưa có món ăn nào"}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hidden file input for CSV import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        style={{ display: "none" }}
        onChange={handleImportCSV}
      />

      <AddFoodModal
        show={show}
        handleClose={handleClose}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        foodInfo={foodInfo}
        foodTypeList={list_data || []}
        setFoodList={setFoodList}
        handleFileChange={handleFileChange}
      />
    </div>
  );
};

export default FoodList;
