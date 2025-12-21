"use client";
import React, { useState, useMemo } from "react";
import {
  Download,
  Filter,
  Search,
  TrendingUp,
  TrendingDown,
  Calendar,
  RefreshCw,
  X,
} from "lucide-react";

const InventoryHistory = () => {
  const [selectedMaterial, setSelectedMaterial] = useState("gao-te");
  const [filterType, setFilterType] = useState("all");
  const [filterSource, setFilterSource] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Dữ liệu mẫu
  const materials = [
    {
      id: "gao-te",
      name: "Gạo tẻ",
      unit: "kg",
      currentStock: 150,
      minStock: 50,
      maxStock: 200,
    },
    {
      id: "thit-bo",
      name: "Thịt bò",
      unit: "kg",
      currentStock: 45,
      minStock: 20,
      maxStock: 80,
    },
    {
      id: "thit-ga",
      name: "Thịt gà",
      unit: "kg",
      currentStock: 60,
      minStock: 25,
      maxStock: 100,
    },
    {
      id: "ca-chua",
      name: "Cà chua",
      unit: "kg",
      currentStock: 25,
      minStock: 10,
      maxStock: 50,
    },
    {
      id: "hanh-tay",
      name: "Hành tây",
      unit: "kg",
      currentStock: 18,
      minStock: 8,
      maxStock: 40,
    },
  ];

  const historyData: Record<string, any[]> = {
    "gao-te": [
      {
        id: 1,
        date: "2024-12-20 14:30",
        type: "import",
        quantity: 50,
        price: 18000,
        supplier: "Công ty TNHH Lương thực",
        note: "Nhập hàng định kỳ",
        user: "Nguyễn Văn A",
        source: "purchase",
      },
      {
        id: 2,
        date: "2024-12-20 12:15",
        type: "deduction",
        quantity: 0.3,
        price: null,
        orderCode: "DH001",
        customerName: "Chị Nguyễn Thị Lan",
        dishName: "Cơm tấm sườn",
        note: "Khấu trừ tự động từ đơn hàng",
        user: "Hệ thống",
        source: "order",
      },
      {
        id: 3,
        date: "2024-12-20 12:10",
        type: "deduction",
        quantity: 0.25,
        price: null,
        orderCode: "DH002",
        customerName: "Anh Trần Văn B",
        dishName: "Cơm gà xối mỡ",
        note: "Khấu trừ tự động từ đơn hàng",
        user: "Hệ thống",
        source: "order",
      },
      {
        id: 4,
        date: "2024-12-19 18:45",
        type: "deduction",
        quantity: 0.3,
        price: null,
        orderCode: "DH003",
        customerName: "Chị Lê Thị C",
        dishName: "Cơm tấm bì chả",
        note: "Khấu trừ tự động từ đơn hàng",
        user: "Hệ thống",
        source: "order",
      },
      {
        id: 5,
        date: "2024-12-19 12:30",
        type: "deduction",
        quantity: 0.35,
        price: null,
        orderCode: "DH004",
        customerName: "Anh Phạm Văn D",
        dishName: "Cơm sườn nướng",
        note: "Khấu trừ tự động từ đơn hàng",
        user: "Hệ thống",
        source: "order",
      },
      {
        id: 6,
        date: "2024-12-19 09:00",
        type: "export",
        quantity: 30,
        price: null,
        note: "Xuất cho bếp chuẩn bị tiệc",
        user: "Trần Thị B",
        source: "manual",
      },
      {
        id: 7,
        date: "2024-12-18 11:20",
        type: "deduction",
        quantity: 0.28,
        price: null,
        orderCode: "DH005",
        customerName: "Chị Hoàng Thị E",
        dishName: "Cơm tấm sườn bì",
        note: "Khấu trừ tự động từ đơn hàng",
        user: "Hệ thống",
        source: "order",
      },
      {
        id: 8,
        date: "2024-12-17 15:00",
        type: "import",
        quantity: 100,
        price: 17500,
        supplier: "Công ty TNHH Lương thực",
        note: "Nhập hàng cuối tuần",
        user: "Nguyễn Văn A",
        source: "purchase",
      },
      {
        id: 9,
        date: "2024-12-16 13:45",
        type: "deduction",
        quantity: 0.32,
        price: null,
        orderCode: "DH006",
        customerName: "Anh Võ Văn F",
        dishName: "Cơm chiên dương châu",
        note: "Khấu trừ tự động từ đơn hàng",
        user: "Hệ thống",
        source: "order",
      },
      {
        id: 10,
        date: "2024-12-15 10:20",
        type: "export",
        quantity: 20,
        price: null,
        note: "Xuất cho sự kiện công ty",
        user: "Lê Văn C",
        source: "manual",
      },
    ],
    "thit-bo": [
      {
        id: 1,
        date: "2024-12-20 08:30",
        type: "import",
        quantity: 20,
        price: 280000,
        supplier: "Thịt sạch ABC",
        note: "Nhập hàng tươi sống",
        user: "Phạm Văn D",
        source: "purchase",
      },
      {
        id: 2,
        date: "2024-12-20 12:15",
        type: "deduction",
        quantity: 0.2,
        price: null,
        orderCode: "DH001",
        customerName: "Chị Nguyễn Thị Lan",
        dishName: "Cơm tấm sườn",
        note: "Khấu trừ tự động từ đơn hàng",
        user: "Hệ thống",
        source: "order",
      },
      {
        id: 3,
        date: "2024-12-19 19:00",
        type: "deduction",
        quantity: 0.25,
        price: null,
        orderCode: "DH007",
        customerName: "Anh Võ Văn F",
        dishName: "Bò lúc lắc",
        note: "Khấu trừ tự động từ đơn hàng",
        user: "Hệ thống",
        source: "order",
      },
      {
        id: 4,
        date: "2024-12-19 12:40",
        type: "deduction",
        quantity: 0.3,
        price: null,
        orderCode: "DH008",
        customerName: "Chị Mai Thị G",
        dishName: "Phở bò tái",
        note: "Khấu trừ tự động từ đơn hàng",
        user: "Hệ thống",
        source: "order",
      },
      {
        id: 5,
        date: "2024-12-18 13:15",
        type: "export",
        quantity: 10,
        price: null,
        note: "Xuất cho món đặc biệt",
        user: "Lê Văn C",
        source: "manual",
      },
      {
        id: 6,
        date: "2024-12-17 08:00",
        type: "import",
        quantity: 30,
        price: 275000,
        supplier: "Thịt sạch ABC",
        note: "Nhập hàng buổi sáng",
        user: "Phạm Văn D",
        source: "purchase",
      },
      {
        id: 7,
        date: "2024-12-16 14:30",
        type: "deduction",
        quantity: 0.28,
        price: null,
        orderCode: "DH009",
        customerName: "Chị Trần Thị H",
        dishName: "Bò kho",
        note: "Khấu trừ tự động từ đơn hàng",
        user: "Hệ thống",
        source: "order",
      },
    ],
  };

  const currentMaterial = materials.find((m) => m.id === selectedMaterial);
  const currentHistory = (historyData[selectedMaterial] as any[]) || [];

  // Lọc và sắp xếp dữ liệu
  const filteredAndSortedHistory = useMemo(() => {
    let filtered = currentHistory.filter((item) => {
      const matchesType = filterType === "all" || item.type === filterType;
      const matchesSource =
        filterSource === "all" || item.source === filterSource;

      const matchesSearch =
        item.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.supplier &&
          item.supplier.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.orderCode &&
          item.orderCode.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.customerName &&
          item.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.dishName &&
          item.dishName.toLowerCase().includes(searchTerm.toLowerCase()));

      // Lọc theo ngày
      const itemDate = new Date(item.date);
      const matchesDateFrom =
        !dateFrom || itemDate >= new Date(dateFrom + " 00:00");
      const matchesDateTo = !dateTo || itemDate <= new Date(dateTo + " 23:59");

      return (
        matchesType &&
        matchesSource &&
        matchesSearch &&
        matchesDateFrom &&
        matchesDateTo
      );
    });

    // Sắp xếp
    filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      switch (sortBy) {
        case "date-desc":
          return dateB.getTime() - dateA.getTime();
        case "date-asc":
          return dateA.getTime() - dateB.getTime();
        case "quantity-desc":
          return b.quantity - a.quantity;
        case "quantity-asc":
          return a.quantity - b.quantity;
        case "price-desc":
          return (b.price || 0) - (a.price || 0);
        case "price-asc":
          return (a.price || 0) - (b.price || 0);
        default:
          return dateB.getTime() - dateA.getTime();
      }
    });

    return filtered;
  }, [
    currentHistory,
    filterType,
    filterSource,
    searchTerm,
    dateFrom,
    dateTo,
    sortBy,
  ]);

  const totalImport = currentHistory
    .filter((h) => h.type === "import")
    .reduce((sum, h) => sum + h.quantity, 0);

  const totalExport = currentHistory
    .filter((h) => h.type === "export" || h.type === "deduction")
    .reduce((sum, h) => sum + h.quantity, 0);

  const totalValue = currentHistory
    .filter((h) => h.type === "import" && h.price)
    .reduce((sum, h) => sum + h.quantity * h.price, 0);

  const avgPrice = currentHistory
    .filter((h) => h.type === "import" && h.price)
    .reduce((sum, h, idx, arr) => sum + h.price / arr.length, 0);

  const resetFilters = () => {
    setFilterType("all");
    setFilterSource("all");
    setSearchTerm("");
    setDateFrom("");
    setDateTo("");
    setSortBy("date-desc");
  };

  const hasActiveFilters =
    filterType !== "all" ||
    filterSource !== "all" ||
    searchTerm ||
    dateFrom ||
    dateTo;

  // Lấy ngày nhanh
  const setQuickDate = (days: any) => {
    const today = new Date();
    const from = new Date(today);
    from.setDate(today.getDate() - days);
    setDateFrom(from.toISOString().split("T")[0]);
    setDateTo(today.toISOString().split("T")[0]);
  };

  return (
    <div
      className="container-fluid py-4"
      style={{ backgroundColor: "#f8f9fa", height: "100vh", overflow: "auto" }}
    >
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="fw-bold text-primary mb-0">
              📦 Lịch sử xuất nhập kho
            </h2>
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-primary"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              >
                <Filter size={16} className="me-1" />
                {showAdvancedFilters ? "Ẩn bộ lọc" : "Bộ lọc nâng cao"}
              </button>
              <button className="btn btn-success">
                <Download size={16} className="me-1" />
                Xuất Excel
              </button>
            </div>
          </div>

          {/* Chọn nguyên liệu */}
          <div className="card shadow-sm mb-3">
            <div className="card-body">
              <label className="form-label fw-semibold">
                Chọn nguyên liệu:
              </label>
              <select
                className="form-select form-select-lg"
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
              >
                {materials.map((material) => (
                  <option key={material.id} value={material.id}>
                    {material.name} (Tồn: {material.currentStock}/
                    {material.maxStock} {material.unit})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Thống kê tổng quan */}
          <div className="row g-3 mb-4">
            <div className="col-md-3">
              <div
                className="card shadow-sm border-0 h-100"
                style={{ borderLeft: "4px solid #28a745" }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="text-muted mb-1 small">Tồn kho hiện tại</p>
                      <h4 className="fw-bold mb-0">
                        {currentMaterial?.currentStock} {currentMaterial?.unit}
                      </h4>
                      <small className="text-muted">
                        Min: {currentMaterial?.minStock} | Max:{" "}
                        {currentMaterial?.maxStock}
                      </small>
                    </div>
                    <div className="bg-success bg-opacity-10 p-3 rounded">
                      <TrendingUp size={24} className="text-success" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div
                className="card shadow-sm border-0 h-100"
                style={{ borderLeft: "4px solid #007bff" }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="text-muted mb-1 small">Tổng nhập</p>
                      <h4 className="fw-bold mb-0">
                        {totalImport} {currentMaterial?.unit}
                      </h4>
                      <small className="text-muted">
                        Giá TB: {avgPrice.toLocaleString("vi-VN")}₫
                      </small>
                    </div>
                    <div className="bg-primary bg-opacity-10 p-3 rounded">
                      <TrendingUp size={24} className="text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div
                className="card shadow-sm border-0 h-100"
                style={{ borderLeft: "4px solid #dc3545" }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="text-muted mb-1 small">Tổng xuất</p>
                      <h4 className="fw-bold mb-0">
                        {totalExport} {currentMaterial?.unit}
                      </h4>
                      <small className="text-muted">
                        Tỷ lệ: {((totalExport / totalImport) * 100).toFixed(1)}%
                      </small>
                    </div>
                    <div className="bg-danger bg-opacity-10 p-3 rounded">
                      <TrendingDown size={24} className="text-danger" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div
                className="card shadow-sm border-0 h-100"
                style={{ borderLeft: "4px solid #ffc107" }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="text-muted mb-1 small">Tổng giá trị nhập</p>
                      <h4 className="fw-bold mb-0">
                        {totalValue.toLocaleString("vi-VN")}₫
                      </h4>
                      <small className="text-muted">
                        {filteredAndSortedHistory.length} giao dịch
                      </small>
                    </div>
                    <div className="bg-warning bg-opacity-10 p-3 rounded">
                      <span className="fs-4">💰</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bộ lọc nâng cao */}
          {showAdvancedFilters && (
            <div className="card shadow-sm mb-3">
              <div className="card-header bg-light">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-semibold">🔍 Bộ lọc nâng cao</span>
                  {hasActiveFilters && (
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={resetFilters}
                    >
                      <RefreshCw size={14} className="me-1" />
                      Đặt lại
                    </button>
                  )}
                </div>
              </div>
              <div className="card-body">
                <div className="row g-3 mb-3">
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">
                      Loại giao dịch:
                    </label>
                    <select
                      className="form-select"
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                    >
                      <option value="all">Tất cả</option>
                      <option value="import">Nhập kho</option>
                      <option value="export">Xuất kho (thủ công)</option>
                      <option value="deduction">Khấu trừ (đơn hàng)</option>
                    </select>
                  </div>

                  <div className="col-md-3">
                    <label className="form-label fw-semibold">
                      Nguồn giao dịch:
                    </label>
                    <select
                      className="form-select"
                      value={filterSource}
                      onChange={(e) => setFilterSource(e.target.value)}
                    >
                      <option value="all">Tất cả</option>
                      <option value="purchase">Nhập hàng</option>
                      <option value="order">Đơn hàng khách</option>
                      <option value="manual">Xuất thủ công</option>
                    </select>
                  </div>

                  <div className="col-md-3">
                    <label className="form-label fw-semibold">
                      Sắp xếp theo:
                    </label>
                    <select
                      className="form-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="date-desc">Ngày (mới nhất)</option>
                      <option value="date-asc">Ngày (cũ nhất)</option>
                      <option value="quantity-desc">
                        Số lượng (cao → thấp)
                      </option>
                      <option value="quantity-asc">
                        Số lượng (thấp → cao)
                      </option>
                      <option value="price-desc">Đơn giá (cao → thấp)</option>
                      <option value="price-asc">Đơn giá (thấp → cao)</option>
                    </select>
                  </div>

                  <div className="col-md-3">
                    <label className="form-label fw-semibold">
                      Tìm kiếm nhanh:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tìm theo tên, mã đơn..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">
                      <Calendar size={14} className="me-1" />
                      Từ ngày:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label fw-semibold">
                      <Calendar size={14} className="me-1" />
                      Đến ngày:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Lọc nhanh:</label>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => setQuickDate(0)}
                      >
                        Hôm nay
                      </button>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => setQuickDate(7)}
                      >
                        7 ngày
                      </button>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => setQuickDate(30)}
                      >
                        30 ngày
                      </button>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => setQuickDate(90)}
                      >
                        90 ngày
                      </button>
                      {(dateFrom || dateTo) && (
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => {
                            setDateFrom("");
                            setDateTo("");
                          }}
                        >
                          <X size={14} /> Xóa
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hiển thị bộ lọc đang áp dụng */}
          {hasActiveFilters && (
            <div className="alert alert-info mb-3 d-flex align-items-center justify-content-between">
              <div>
                <strong>Đang lọc:</strong>
                {filterType !== "all" && (
                  <span className="badge bg-primary ms-2">
                    {filterType === "import"
                      ? "Nhập kho"
                      : filterType === "export"
                      ? "Xuất kho"
                      : "Khấu trừ"}
                  </span>
                )}
                {filterSource !== "all" && (
                  <span className="badge bg-secondary ms-2">
                    {filterSource === "purchase"
                      ? "Nhập hàng"
                      : filterSource === "order"
                      ? "Đơn hàng"
                      : "Thủ công"}
                  </span>
                )}
                {searchTerm && (
                  <span className="badge bg-success ms-2">
                    Từ khóa: "{searchTerm}"
                  </span>
                )}
                {dateFrom && (
                  <span className="badge bg-warning text-dark ms-2">
                    Từ: {new Date(dateFrom).toLocaleDateString("vi-VN")}
                  </span>
                )}
                {dateTo && (
                  <span className="badge bg-warning text-dark ms-2">
                    Đến: {new Date(dateTo).toLocaleDateString("vi-VN")}
                  </span>
                )}
              </div>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={resetFilters}
              >
                Xóa tất cả
              </button>
            </div>
          )}

          {/* Bảng lịch sử */}
          <div className="card shadow-sm">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="py-3">Thời gian</th>
                      <th className="py-3">Loại</th>
                      <th className="py-3">Số lượng</th>
                      <th className="py-3">Đơn giá</th>
                      <th className="py-3">Thành tiền</th>
                      <th className="py-3">Khách hàng/Món</th>
                      <th className="py-3">Nguồn/Đích</th>
                      <th className="py-3">Ghi chú</th>
                      <th className="py-3">Người thực hiện</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedHistory.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="text-center py-5 text-muted">
                          <div className="fs-1 mb-2">📋</div>
                          {hasActiveFilters
                            ? "Không tìm thấy kết quả phù hợp với bộ lọc"
                            : "Không có dữ liệu"}
                        </td>
                      </tr>
                    ) : (
                      filteredAndSortedHistory.map((item) => (
                        <tr key={item.id}>
                          <td className="py-3">
                            <div className="fw-semibold">
                              {new Date(item.date).toLocaleDateString("vi-VN")}
                            </div>
                            <small className="text-muted">
                              {new Date(item.date).toLocaleTimeString("vi-VN", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </small>
                          </td>
                          <td className="py-3">
                            {item.type === "import" ? (
                              <span className="badge bg-primary">
                                <TrendingUp size={14} className="me-1" />
                                Nhập kho
                              </span>
                            ) : item.type === "deduction" ? (
                              <span className="badge bg-warning text-dark">
                                🛒 Khấu trừ
                              </span>
                            ) : (
                              <span className="badge bg-danger">
                                <TrendingDown size={14} className="me-1" />
                                Xuất kho
                              </span>
                            )}
                          </td>
                          <td className="py-3 fw-semibold">
                            <span
                              className={
                                item.type === "import"
                                  ? "text-success"
                                  : "text-danger"
                              }
                            >
                              {item.type === "import" ? "+" : "-"}
                              {item.quantity} {currentMaterial?.unit}
                            </span>
                          </td>
                          <td className="py-3">
                            {item.price
                              ? `${item.price.toLocaleString("vi-VN")}₫`
                              : "-"}
                          </td>
                          <td className="py-3 fw-semibold text-success">
                            {item.price
                              ? `${(item.quantity * item.price).toLocaleString(
                                  "vi-VN"
                                )}₫`
                              : "-"}
                          </td>
                          <td className="py-3">
                            {item.type === "deduction" ? (
                              <div>
                                <div className="fw-semibold text-primary">
                                  {item.customerName}
                                </div>
                                <small className="text-muted">
                                  → {item.dishName}
                                </small>
                              </div>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="py-3">
                            {item.type === "import" ? (
                              <small className="text-muted">
                                <div className="fw-semibold">
                                  NCC: {item.supplier}
                                </div>
                              </small>
                            ) : (
                              <small className="text-muted">
                                <span className="badge bg-light text-dark border">
                                  {item.orderCode || "Thủ công"}
                                </span>
                              </small>
                            )}
                          </td>
                          <td className="py-3">
                            <small>{item.note}</small>
                          </td>
                          <td className="py-3">
                            <small className="text-muted">{item.user}</small>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-3 text-muted small text-center">
            Hiển thị {filteredAndSortedHistory.length} / {currentHistory.length}{" "}
            giao dịch của {currentMaterial?.name}
          </div>
        </div>
      </div>

      {/* Bootstrap CSS */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
    </div>
  );
};

export default InventoryHistory;
