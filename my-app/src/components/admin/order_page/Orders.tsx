"use client";
import { useOrderPage } from "@/hook/admin/useOrderPage";
import { Order } from "@/types/order";
import React, { useState } from "react";
import OrderItem from "./OrderItem";
import { useFilterOrder } from "@/hook/admin/useFilterOrder";
import { useRouter } from "next/navigation";

const Orders = ({ orders }: { orders: Order[] }) => {
  const router = useRouter();
  const { orderList, handleChange, filters, isError } = useOrderPage();
  const [showFilters, setShowFilters] = useState(false);

  // Quyết định dùng data từ đâu
  const displayOrders = orderList && orderList.length > 0 ? orderList : orders;
  React.useEffect(() => {
    if (isError) {
      router.push("/login?error=invalid-token");
    }
  }, [isError, router]);

  if (!orderList) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container-fluid p-4"
      style={{ height: "100vh", overflow: "auto" }}
    >
      {/* Header */}
      <div className="row mb-4 align-items-center ">
        <div className="col">
          <h2 className="mb-1">Lịch sử đơn hàng</h2>
          <p className="text-muted mb-0">
            Quản lý và theo dõi đơn hàng của khách hàng
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          {/* Search and Filter Toggle */}
          <div className="row g-3 mb-3">
            <div className="col-md-8">
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm theo mã đơn, tên khách hàng, email..."
                />
              </div>
            </div>
            <div className="col-md-4">
              <button
                className="btn btn-outline-primary w-100"
                onClick={() => setShowFilters(!showFilters)}
              >
                <i className="bi bi-funnel me-2"></i>
                {showFilters ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="border-top pt-3">
              <div className="row g-3">
                {/* Status Filter */}
                <div className="col-md-3">
                  <label className="form-label small fw-semibold">
                    Trạng thái
                  </label>
                  <select
                    className="form-select"
                    name="status"
                    onChange={handleChange}
                  >
                    <option value="all">Tất cả</option>
                    <option value="1">Chờ xử lý</option>
                    <option value="2">Đang xử lý</option>
                    <option value="3">Hoàn thành</option>
                    <option value="4">Đã hủy</option>
                  </select>
                </div>

                {/* Payment Method */}
                <div className="col-md-3">
                  <label className="form-label small fw-semibold">
                    Phương thức thanh toán
                  </label>
                  <select className="form-select">
                    <option value="all">Tất cả</option>
                    <option value="credit_card">Thẻ tín dụng</option>
                    <option value="bank_transfer">Chuyển khoản</option>
                    <option value="cod">COD</option>
                  </select>
                </div>

                {/* Date From */}
                <div className="col-md-3">
                  <label className="form-label small fw-semibold">
                    Từ ngày
                  </label>
                  <input
                    onChange={(event) => {
                      console.log("Date on change: " + filters.start_date);
                      handleChange(event);
                    }}
                    type="date"
                    name="start_date"
                    value={
                      filters.start_date
                        ? new Date(filters.start_date)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    className="form-control"
                  />
                </div>

                {/* Date To */}
                <div className="col-md-3">
                  <label className="form-label small fw-semibold">
                    Đến ngày
                  </label>
                  <input
                    type="date"
                    name="end_date"
                    onChange={handleChange}
                    value={
                      filters.end_date
                        ? new Date(filters.end_date).toISOString().split("T")[0]
                        : ""
                    }
                    className="form-control"
                  />
                </div>

                {/* Min Amount */}
                <div className="col-md-3">
                  <label className="form-label small fw-semibold">
                    Số tiền tối thiểu
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="0"
                  />
                </div>

                {/* Max Amount */}
                <div className="col-md-3">
                  <label className="form-label small fw-semibold">
                    Số tiền tối đa
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Không giới hạn"
                  />
                </div>

                {/* Sort By */}
                <div className="col-md-3">
                  <label className="form-label small fw-semibold">
                    Sắp xếp theo
                  </label>
                  <select className="form-select">
                    <option value="date">Ngày tạo</option>
                    <option value="amount">Tổng tiền</option>
                    <option value="customer">Tên khách hàng</option>
                  </select>
                </div>

                {/* Sort Order */}
                <div className="col-md-3">
                  <label className="form-label small fw-semibold">Thứ tự</label>
                  <select
                    className="form-select"
                    name="sort_order"
                    onChange={handleChange}
                  >
                    <option value="desc">Giảm dần</option>
                    <option value="asc">Tăng dần</option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="col-12">
                  <div className="d-flex gap-2 justify-content-end">
                    <button className="btn btn-outline-secondary">
                      <i className="bi bi-arrow-clockwise me-2"></i>
                      Đặt lại
                    </button>
                    <button className="btn btn-primary">
                      <i className="bi bi-check-circle me-2"></i>
                      Áp dụng bộ lọc
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="bg-primary bg-opacity-10 rounded p-3">
                    <i className="bi bi-cart-check text-primary fs-4"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <p className="text-muted mb-0 small">Tổng đơn hàng</p>
                  <h4 className="mb-0">{displayOrders?.length || 0}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="bg-warning bg-opacity-10 rounded p-3">
                    <i className="bi bi-clock-history text-warning fs-4"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <p className="text-muted mb-0 small">Chờ xử lý</p>
                  <h4 className="mb-0">0</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="bg-success bg-opacity-10 rounded p-3">
                    <i className="bi bi-check-circle text-success fs-4"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <p className="text-muted mb-0 small">Hoàn thành</p>
                  <h4 className="mb-0">0</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="bg-info bg-opacity-10 rounded p-3">
                    <i className="bi bi-cash-stack text-info fs-4"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <p className="text-muted mb-0 small">Tổng doanh thu</p>
                  <h4 className="mb-0">0đ</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="card shadow-sm">
        <div className="card-header bg-white py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Danh sách đơn hàng</h5>
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-outline-secondary">
                <i className="bi bi-download me-1"></i>
                Export
              </button>
              <button className="btn btn-sm btn-outline-secondary">
                <i className="bi bi-printer me-1"></i>
                In
              </button>
            </div>
          </div>
        </div>
        <div
          className="card-body p-0"
          style={{ overflow: "auto", maxHeight: "600px" }}
        >
          <table className="table table-hover mb-0">
            <thead className="table-light sticky-top">
              <tr>
                <th scope="col" className="ps-4">
                  #
                </th>
                <th scope="col">Mã đơn</th>
                <th scope="col">Khách hàng</th>
                <th scope="col">Tổng tiền</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Xử lý</th>
              </tr>
            </thead>
            <tbody>
              {displayOrders?.length > 0 ? (
                displayOrders.map((item, index) => (
                  <OrderItem key={item.id || index} item={item} />
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-5">
                    <div className="text-muted">
                      <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                      <p className="mb-0">Không có đơn hàng nào</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {displayOrders?.length > 0 && (
          <div className="card-footer bg-white">
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-muted small">
                Hiển thị 1-{displayOrders.length} của {displayOrders.length} đơn
                hàng
              </div>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className="page-item disabled">
                    <a className="page-link" href="#">
                      Trước
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Sau
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
