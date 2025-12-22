"use client";
import { inventoryQuery } from "@/query/inventory";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data
const mockOrdersData = [
  { time: "07:00", orders: 5 },
  { time: "08:00", orders: 12 },
  { time: "09:00", orders: 18 },
  { time: "10:00", orders: 15 },
  { time: "11:00", orders: 25 },
  { time: "12:00", orders: 45 },
  { time: "13:00", orders: 38 },
  { time: "14:00", orders: 22 },
  { time: "15:00", orders: 10 },
  { time: "16:00", orders: 8 },
];

const mockTopDishes = [
  {
    id: 1,
    name: "Phở Bò",
    quantity: 45,
    status: "hot",
    trend: "+12%",
    image: "🍜",
  },
  {
    id: 2,
    name: "Cơm Tấm",
    quantity: 38,
    status: "hot",
    trend: "+8%",
    image: "🍚",
  },
  {
    id: 3,
    name: "Bún Chả",
    quantity: 32,
    status: "normal",
    trend: "+5%",
    image: "🥢",
  },
  {
    id: 4,
    name: "Bánh Mì",
    quantity: 28,
    status: "normal",
    trend: "-3%",
    image: "🥖",
  },
  {
    id: 5,
    name: "Gỏi Cuốn",
    quantity: 22,
    status: "normal",
    trend: "+2%",
    image: "🌯",
  },
];

const mockPendingOrders: Array<{
  id: string;
  table: string;
  items: string[];
  time: string;
  priority: "high" | "medium" | "low";
}> = [
  {
    id: "ORD001",
    table: "Bàn 5",
    items: ["Phở Bò x2", "Cà phê sữa x1"],
    time: "5 phút trước",
    priority: "high",
  },
  {
    id: "ORD002",
    table: "Bàn 12",
    items: ["Cơm Tấm x1", "Trà đá x1"],
    time: "8 phút trước",
    priority: "high",
  },
  {
    id: "ORD003",
    table: "Bàn 3",
    items: ["Bún Chả x3"],
    time: "12 phút trước",
    priority: "medium",
  },
  {
    id: "ORD004",
    table: "Bàn 8",
    items: ["Bánh Mì x2", "Nước cam x2"],
    time: "3 phút trước",
    priority: "high",
  },
  {
    id: "ORD005",
    table: "Bàn 15",
    items: ["Gỏi Cuốn x4", "Trà sữa x2"],
    time: "15 phút trước",
    priority: "low",
  },
];

const mockCategoryData = [
  { name: "Món chính", value: 125, color: "#0d6efd" },
  { name: "Đồ uống", value: 85, color: "#198754" },
  { name: "Món phụ", value: 45, color: "#ffc107" },
  { name: "Tráng miệng", value: 28, color: "#dc3545" },
];

const mockInventory: Array<{
  name: string;
  stock: number;
  unit: string;
  status: "good" | "low" | "critical";
}> = [
  { name: "Thịt bò", stock: 85, unit: "kg", status: "good" },
  { name: "Rau xanh", stock: 45, unit: "kg", status: "good" },
  { name: "Gạo", stock: 180, unit: "kg", status: "good" },
  { name: "Hành tây", stock: 15, unit: "kg", status: "low" },
  { name: "Cà chua", stock: 8, unit: "kg", status: "critical" },
];

const ChefDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const [orderFilter, setOrderFilter] = useState("all");
  const { data: inventoryList } = useQuery(inventoryQuery.list);
  const stats = {
    totalOrders: 283,
    pendingOrders: 5,
    completedToday: 278,
    avgPrepTime: "12 phút",
  };

  const getPriorityBadge = (priority: "high" | "medium" | "low") => {
    const badges = {
      high: "danger",
      medium: "warning",
      low: "secondary",
    };
    return badges[priority] || "secondary";
  };

  const getStockBadge = (status: "good" | "low" | "critical") => {
    const badges = {
      good: "success",
      low: "warning",
      critical: "danger",
    };
    return badges[status] || "secondary";
  };

  return (
    <div
      className="container-fluid p-4"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">
            <i className="bi bi-person-badge me-2 text-success"></i>
            Bảng điều khiển Đầu Bếp
          </h2>
          <p className="text-muted mb-0">
            <i className="bi bi-calendar-check me-1"></i>
            {new Date().toLocaleDateString("vi-VN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="btn-group">
          <button
            className={`btn ${
              selectedPeriod === "today" ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => setSelectedPeriod("today")}
          >
            Hôm nay
          </button>
          <button
            className={`btn ${
              selectedPeriod === "week" ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => setSelectedPeriod("week")}
          >
            Tuần này
          </button>
          <button
            className={`btn ${
              selectedPeriod === "month" ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => setSelectedPeriod("month")}
          >
            Tháng này
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1 small">Tổng đơn hàng</p>
                  <h3 className="fw-bold mb-0">{stats.totalOrders}</h3>
                  <span className="badge bg-success-subtle text-success mt-2">
                    <i className="bi bi-arrow-up"></i> +15%
                  </span>
                </div>
                <div className="bg-primary-subtle rounded-3 p-3">
                  <i className="bi bi-receipt text-primary fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1 small">Đơn đang chờ</p>
                  <h3 className="fw-bold mb-0 text-danger">
                    {stats.pendingOrders}
                  </h3>
                  <span className="badge bg-danger-subtle text-danger mt-2">
                    <i className="bi bi-clock"></i> Khẩn cấp
                  </span>
                </div>
                <div className="bg-danger-subtle rounded-3 p-3">
                  <i className="bi bi-hourglass-split text-danger fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1 small">Đã hoàn thành</p>
                  <h3 className="fw-bold mb-0 text-success">
                    {stats.completedToday}
                  </h3>
                  <span className="badge bg-success-subtle text-success mt-2">
                    <i className="bi bi-check-circle"></i> Xuất sắc
                  </span>
                </div>
                <div className="bg-success-subtle rounded-3 p-3">
                  <i className="bi bi-check2-circle text-success fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1 small">Thời gian TB</p>
                  <h3 className="fw-bold mb-0">{stats.avgPrepTime}</h3>
                  <span className="badge bg-warning-subtle text-warning mt-2">
                    <i className="bi bi-speedometer"></i> Tốt
                  </span>
                </div>
                <div className="bg-warning-subtle rounded-3 p-3">
                  <i className="bi bi-alarm text-warning fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="row g-3 mb-4">
        {/* Orders Timeline */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0 pt-3">
              <h5 className="fw-bold mb-0">
                <i className="bi bi-graph-up me-2 text-primary"></i>
                Lượng đơn hàng theo giờ
              </h5>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={mockOrdersData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#0d6efd"
                    strokeWidth={3}
                    name="Số đơn hàng"
                    dot={{ fill: "#0d6efd", r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0 pt-3">
              <h5 className="fw-bold mb-0">
                <i className="bi bi-pie-chart me-2 text-success"></i>
                Phân bổ theo danh mục
              </h5>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={mockCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent! * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {mockCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Row */}
      <div className="row g-3">
        {/* Top Dishes */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 pt-3">
              <h5 className="fw-bold mb-0">
                <i className="bi bi-fire me-2 text-danger"></i>
                Món ăn phổ biến
              </h5>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {mockTopDishes.map((dish, index) => (
                  <div key={dish.id} className="list-group-item border-0 py-3">
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        <span
                          className="badge bg-primary rounded-circle"
                          style={{
                            width: "40px",
                            height: "40px",
                            fontSize: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {dish.image}
                        </span>
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h6 className="mb-0">{dish.name}</h6>
                            <small className="text-muted">
                              <i className="bi bi-box me-1"></i>
                              {dish.quantity} phần
                            </small>
                          </div>
                          <span
                            className={`badge bg-${
                              dish.trend.startsWith("+") ? "success" : "danger"
                            }-subtle text-${
                              dish.trend.startsWith("+") ? "success" : "danger"
                            }`}
                          >
                            {dish.trend}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 pt-3 d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-0">
                <i className="bi bi-clock-history me-2 text-warning"></i>
                Đơn hàng đang chờ
              </h5>
              <span className="badge bg-danger">
                {mockPendingOrders.length}
              </span>
            </div>
            <div
              className="card-body p-0"
              style={{ maxHeight: "400px", overflowY: "auto" }}
            >
              <div className="list-group list-group-flush">
                {mockPendingOrders.map((order) => (
                  <div key={order.id} className="list-group-item border-0 py-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h6 className="mb-1">
                          <span
                            className={`badge bg-${getPriorityBadge(
                              order.priority
                            )} me-2`}
                          >
                            {order.priority === "high"
                              ? "Khẩn"
                              : order.priority === "medium"
                              ? "TB"
                              : "Thấp"}
                          </span>
                          {order.id} - {order.table}
                        </h6>
                        <small className="text-muted">
                          <i className="bi bi-clock me-1"></i>
                          {order.time}
                        </small>
                      </div>
                      <button className="btn btn-sm btn-success">
                        <i className="bi bi-check-lg"></i>
                      </button>
                    </div>
                    <div className="ms-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="text-muted small">
                          <i className="bi bi-dot"></i> {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Status */}
        <div className="col-lg-3">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 pt-3">
              <h5 className="fw-bold mb-0">
                <i className="bi bi-box-seam me-2 text-info"></i>
                Tình trạng kho
              </h5>
            </div>
            <div
              className="card-body p-0"
              style={{ maxHeight: "400px", overflowY: "auto" }}
            >
              <div className="list-group list-group-flush">
                {inventoryList?.map((item, index) => {
                  const stockState = (item.stock * 100) / item.stock_limit;
                  let status = "critical" as "good" | "low" | "critical";
                  if (stockState >= 40) {
                    status = "good";
                  } else if (stockState >= 15) {
                    status = "low";
                  } else {
                    status = "critical";
                  }
                  return (
                    <div key={index} className="list-group-item border-0 py-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="mb-0">{item.name}</h6>
                        <span className={`badge bg-${getStockBadge(status)}`}>
                          {status === "good"
                            ? "Đủ"
                            : status === "low"
                            ? "Thấp"
                            : "Cạn"}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                          <i className="bi bi-box me-1"></i>
                          {item.stock} {item.units.name}
                        </small>
                        <div
                          className="progress"
                          style={{ width: "100px", height: "6px" }}
                        >
                          <div
                            className={`progress-bar bg-${getStockBadge(
                              status
                            )}`}
                            style={{
                              width: `${stockState}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {/* {mockInventory.map((item, index) => (
                  <div key={index} className="list-group-item border-0 py-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-0">{item.name}</h6>
                      <span
                        className={`badge bg-${getStockBadge(item.status)}`}
                      >
                        {item.status === "good"
                          ? "Đủ"
                          : item.status === "low"
                          ? "Thấp"
                          : "Cạn"}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">
                        <i className="bi bi-box me-1"></i>
                        {item.stock} {item.unit}
                      </small>
                      <div
                        className="progress"
                        style={{ width: "100px", height: "6px" }}
                      >
                        <div
                          className={`progress-bar bg-${getStockBadge(
                            item.status
                          )}`}
                          style={{
                            width: `${
                              item.status === "good"
                                ? 80
                                : item.status === "low"
                                ? 40
                                : 15
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefDashboard;
