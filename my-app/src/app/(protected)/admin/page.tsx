import { API_URL } from "@/helper/api";
import BarCharts from "@/components/admin/dashboard/BarChart";
import OrderTable from "@/components/admin/dashboard/OrderTable";
import PieCharts from "@/components/admin/dashboard/PieChart";
import http from "@/lib/http";
import { DashBoardInfo } from "@/types/dashBoardInfo";
import axios from "axios";
import { cookies } from "next/headers";
import Script from "next/script";
import React from "react";

const DashBoard = async () => {
  console.log("Enpoint: " + API_URL);
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  console.log("Token : " + token);
  const { data: dashboard } = await axios.get(`http://backend:8080/dashboard`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  const dashboardInfo = dashboard as DashBoardInfo;
  const dataMap = new Map(Object.entries(dashboardInfo.statistics));
  const foodTypeMap = new Map(
    Object.entries(dashboardInfo.statisticByFoodType)
  );

  const dateKeys = Array.from(dataMap.keys()).slice(0, 7);
  const dateValues = dateKeys
    .map((date) => dataMap.get(date))

    .slice(0, 7);
  console.log("foodTypeMap:", foodTypeMap);
  //convert foodTypeMap to object

  const foodTypeKeys = Array.from(foodTypeMap.keys());
  const foodTypeValues = foodTypeKeys.map((type) => foodTypeMap.get(type) || 0);

  const totalFoodTypeValue = foodTypeValues.reduce(
    (sum, value) => sum + value,
    0
  );

  const foodTypeObject = foodTypeKeys.map((type, index) => ({
    label: type,
    value: (foodTypeValues[index] * 100) / totalFoodTypeValue,
  }));

  // console.log("foodTypeObject:", foodTypeObject);
  // // Kiểm tra kết quả
  // console.log(dataMap);
  // console.log("Số lượng entries:", dataMap.size);

  // // Lấy giá trị theo ngày
  // console.log("Giá trị ngày 2025-12-02:", dataMap.get("2025-12-02")); // 322000
  // console.log("Các ngày đã sắp xếp:", dateKeys);

  // // Lấy giá trị tương ứng
  // console.log("Giá trị theo ngày đã sắp xếp:", dateValues);
  // // Duyệt Map
  // dataMap.forEach((value, date) => {
  //   console.log(`${date}: ${value.toLocaleString("vi-VN")}đ`);
  // });

  return (
    <>
      <Script
        src="http://localhost:3000/assets/js/scripts.js"
        strategy="afterInteractive"
      />
      <Script
        src="http://localhost:3000/assets/js/datatables-simple-demo.js"
        strategy="afterInteractive"
      />
      <Script
        src="http://localhost:3000/assets/demo/chart-area-demo.js"
        strategy="afterInteractive"
      />
      <Script src="http://localhost:3000/assets/demo/chart-bar-demo.js" />
      <Script src="http://localhost:3000/assets/demo/datatables-demo.js" />
      <div
        className="container-fluid px-4"
        style={{ overflow: "auto", height: "100vh" }}
      >
        <h1 className="mt-4">Dashboard</h1>
        <div className="d-flex justify-content-end">
          <div
            className="btn-group btn-group-sm "
            role="group"
            aria-label="Small button group"
          >
            <button type="button" className="btn btn-primary">
              Hôm nay
            </button>
            <button type="button" className="btn btn-outline-primary">
              7 ngày
            </button>
            <button type="button" className="btn btn-outline-primary">
              30 ngày
            </button>
          </div>
        </div>
        <ol className="breadcrumb mb-4"></ol>
        <div className="row">
          <div className="col-xl-3 col-md-6">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">
                <h4>
                  {" "}
                  <strong> Tổng doanh thu</strong>
                </h4>
                <p>{dashboardInfo.total.toLocaleString()} vnđ</p>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <a className="small text-white stretched-link" href="#">
                  View Details
                </a>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-warning text-white mb-4">
              <div className="card-body">
                <h4>
                  {" "}
                  <strong>Tổng đơn hàng</strong>
                </h4>
                <p>{dashboardInfo.total_count} đơn hàng</p>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <a className="small text-white stretched-link" href="#">
                  View Details
                </a>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-success text-white mb-4">
              <div className="card-body">
                <h4>
                  {" "}
                  <strong>Đã hoàn thành</strong>
                </h4>
                <p>{dashboardInfo.completed_count} đơn hàng</p>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <a className="small text-white stretched-link" href="#">
                  View Details
                </a>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-danger text-white mb-4">
              <div className="card-body">
                <h4>
                  {" "}
                  <strong>Đã huỷ</strong>
                </h4>
                <p>{dashboardInfo.cancel_count} đơn hàng</p>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <a className="small text-white stretched-link" href="#">
                  View Details
                </a>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-6">
            <div className="card mb-4">
              <div className="card-header">
                <i className="fas fa-chart-area me-1"></i>
                Area Chart Example
              </div>
              <div className="card-body">
                <BarCharts dataKeys={dateKeys} dataValues={dateValues} />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="card mb-4">
              <div className="card-header">
                <i className="fas fa-chart-bar me-1"></i>
                Doanh thu theo loại món ăn
              </div>
              <div className="card-body">
                <PieCharts foodTypeObject={foodTypeObject} />
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-table me-1"></i>
            DataTable Example
          </div>
          <div
            className="card-body"
            style={{ overflow: "scroll", height: "400px" }}
          >
            <OrderTable orders={dashboardInfo.orders} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
