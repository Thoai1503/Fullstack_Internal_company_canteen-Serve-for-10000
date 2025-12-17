"use server";
import { API_URL } from "@/helper/api";
import { CartItem } from "@/types/cartItem";
import axios from "axios";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import React from "react";

export default async function Cart() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user_id = Number(cookieStore.get("user")?.value);
  if (!user_id) {
    return redirect("/login");
  }
  const { data: cartItems } = await axios.get<CartItem[]>(
    `${API_URL}/cartitem/user/${user_id}`,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    }
  );
  const total = cartItems.reduce(
    (sum, item) => sum + item.food.price! * item.quantity,
    0
  );

  return (
    <div className="container">
      <div className="container">
        <div className="row mt-4">
          <div className="col-12 col-lg-8 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>
                <strong>Giỏ hàng ({cartItems.length})</strong>
              </h5>
              <p
                style={{
                  fontSize: "13px",
                  cursor: "pointer",
                  color: "#63b6c5ff",
                }}
              >
                Xoá tất cả
              </p>
            </div>
            <div className="bg-white p-3 rounded">
              {/* Header - Desktop only */}
              <div
                className="row mb-3 d-none d-lg-flex"
                style={{ borderBottom: "1px solid lightgray" }}
              >
                <div className="col-lg-7 text">
                  <strong>Tên sản phẩm</strong>
                </div>
                <div className="col-lg-2 text">
                  <strong>Đơn giá</strong>
                </div>
                <div className="col-lg-2 text">
                  <strong>Số lượng</strong>
                </div>
                <div className="col-lg-1 text">
                  <strong>Thành tiền</strong>
                </div>
              </div>

              <div>
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item pb-3 mb-3">
                    {/* Desktop Layout */}
                    <div className="row align-items-center d-none d-lg-flex">
                      <div className="col-lg-2">
                        <img
                          width={80}
                          src={`${API_URL}/upload/${item?.food.image}`}
                          alt={item.food.image}
                        />
                      </div>
                      <div className="col-lg-5">
                        <div className="row">
                          <p className="cart-item title mb-0 text">
                            {item?.food.name}
                          </p>
                          <span
                            className="sku text"
                            style={{
                              fontSize: "14px",
                            }}
                          >
                            SKU: 123456
                          </span>
                          <div className="variant">
                            <span
                              className="p-1 text"
                              style={{
                                backgroundColor: "#f3f3f3ff",
                                fontSize: "13px",
                                borderRadius: "3px",
                              }}
                            >
                              Màu bạc + 64 GB
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2">
                        <span className="item-price d-flex justify-content-end">
                          <strong className="text">
                            {item.food.price!.toLocaleString("vi-VN")}đ
                          </strong>
                        </span>
                      </div>
                      <div className="col-lg-2 d-flex justify-content-center">
                        {/* {create a d-flex div with 2 change quantity button and the quantity that not input} */}
                        <div className="d-flex align-items-center gap-2">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            disabled={item.quantity! <= 1}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button className="btn btn-outline-secondary btn-sm">
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-lg-1">
                        <span className="item-price d-flex justify-content-end">
                          <strong className="text">
                            {(
                              item.food.price! * (item.quantity || 1)
                            ).toLocaleString("vi-VN")}
                            đ
                          </strong>
                        </span>
                      </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="d-lg-none">
                      <div className="d-flex gap-3 mb-2">
                        <img
                          width={80}
                          height={80}
                          style={{ objectFit: "contain" }}
                          src={`/uploads/${item?.food.image}`}
                          alt={item?.food.image}
                        />
                        <div className="flex-grow-1">
                          <p className="mb-1">
                            <strong>{item?.food.name}</strong>
                          </p>
                          <p
                            className="text-muted mb-1"
                            style={{ fontSize: "12px" }}
                          >
                            SKU: 123456
                          </p>
                          <span
                            className="p-1"
                            style={{
                              backgroundColor: "#f3f3f3ff",
                              fontSize: "12px",
                              borderRadius: "3px",
                            }}
                          >
                            Màu bạc + 64 GB
                          </span>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <div>
                          <p className="mb-0" style={{ fontSize: "14px" }}>
                            Đơn giá:
                          </p>
                          <strong>
                            {item.food.price!.toLocaleString("vi-VN")}đ
                          </strong>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span style={{ fontSize: "14px" }}>SL:</span>
                          <input
                            type="number"
                            value={item.quantity}
                            min="1"
                            className="form-control"
                            style={{ width: "60px" }}
                          />
                        </div>
                        <div className="text-end">
                          <p className="mb-0" style={{ fontSize: "14px" }}>
                            Thành tiền:
                          </p>
                          <strong style={{ color: "#1586ddff" }}>
                            {total.toLocaleString("vi-VN")}đ
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="p-3 bg-white rounded">
              <p>
                <strong>Thanh toán</strong>
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <h6>Tạm tính:</h6>
                <p>200.000 đ</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <h6>Thành tiền:</h6>
                <h6 style={{ color: "#1586ddff" }}>200.000 đ</h6>
              </div>

              <hr />
              <p style={{ fontSize: "14px", color: "gray" }}>
                Giá đã bao gồm VAT (nếu có)
              </p>

              <a
                href="/checkout"
                className="btn btn-outline-primary w-100 mt-3"
              >
                Thanh toán
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
