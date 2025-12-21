"use client";
import React, { useState } from "react";
import PaymentMethod from "./PaymentMethod";
import { CartItem } from "@/types/cartItem";
import { useMutation } from "@tanstack/react-query";
import { checkOutAPI } from "@/service/checkout";

const Checkouts = ({
  paymentList,
  cartItems,
  user_id,
}: {
  paymentList: any;
  cartItems: CartItem[];
  user_id: number;
}) => {
  const token = localStorage.getItem("token") && localStorage.getItem("token");
  const total = cartItems.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0
  );

  const { mutate: checkout } = useMutation({
    mutationFn: ({ paymentInfo, token }: { paymentInfo: any; token: string }) =>
      checkOutAPI(paymentInfo, token),
    onSuccess: (data) => {
      if (!data.data.startsWith("http")) {
        alert(data.data);
        return;
      }
         window.location.href = `${data.data}`;
    },
    onError: (error) => {
      alert(error);
    },
  });

  const [paymentInfo, setPaymentInfo] = useState<any>({
    amount: total,
    orderId: Date.now(),

    user_id,
    method: "",
    orderInfo: user_id,
  });
  const handleCheckout = () => {
    alert(JSON.stringify(paymentInfo));
    alert(token);

    checkout({ paymentInfo, token: token || "" });
  };
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const handleSelectPaymentMethod = (method: string) => {
    switch (method) {
      case "momo":
        delete paymentInfo.bankCode;
        setPaymentInfo((pre: any) => ({ ...pre, method: method.trim() }));
        setSelectedMethod("momo");
        return;
      case "NCB":
        setPaymentInfo((pre: any) => ({
          ...pre,
          method: "vnpay",
          bankCode: "NCB",
        }));
        setSelectedMethod("NCB");
        return;
      case "VNBANK":
        setPaymentInfo((pre: any) => ({
          ...pre,
          method: "vnpay",
          bankCode: "VNBANK",
        }));
        setSelectedMethod("VNBANK");
        return;
      default:
        setPaymentInfo({
          amount: 0,
          orderId: Date.now(),

          method: "",
          user_id: 0,
          orderInfo: "",
        });
    }
  };
  return (
    <div className="row">
      <div className="col-lg-8">
        <div className="adress-info bg-white p-3 rounded mt-3">
          <PaymentMethod
            paymentList={paymentList}
            selectedMethod={selectedMethod}
            handleSelectPaymentMethod={handleSelectPaymentMethod}
          />
        </div>
      </div>
      <div className="col-lg-4">
        <div className="adress-info bg-white p-3 rounded">
          <div className="head">
            <h6>
              <strong>Thông tin đơn hàng</strong>
            </h6>
          </div>
          <hr />

          {/* Danh sách sản phẩm */}
          <div className="order-items">
            {cartItems?.map((item) => (
              <div className="d-flex mb-3">
                <div
                  className="position-relative"
                  style={{ width: "80px", height: "80px", flexShrink: 0 }}
                >
                  <img
                    src={`http://localhost:8000/Thoai-pro-spring/upload/${item?.food.image}`}
                    alt="Product"
                    className="rounded"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="ms-3 flex-grow-1">
                  <p className="text mb-1" style={{ fontSize: "14px" }}>
                    {item.food.name}
                  </p>
                  <p className="text-muted mb-0" style={{ fontSize: "13px" }}>
                    Loại món: Xanh dương
                  </p>
                  <p className="text mb-0" style={{ fontSize: "14px" }}>
                    <strong>{item.food.price.toLocaleString()} VND</strong> x{" "}
                    {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <hr />

          {/* Mã giảm giá */}
          <div className="mb-3">
            <div className="d-flex align-items-center">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Nhập mã giảm giá"
                style={{ flex: 1, marginRight: "8px" }}
              />
              <button
                className="btn btn-sm text-white"
                style={{ backgroundColor: "#06b6d4" }}
              >
                Áp dụng
              </button>
            </div>
          </div>

          <hr />

          {/* Tổng tiền */}
          <div className="order-summary">
            <div className="d-flex justify-content-between mb-2">
              <span className="text" style={{ fontSize: "14px" }}>
                Tạm tính
              </span>
              <span className="text" style={{ fontSize: "14px" }}>
                {total.toLocaleString()}đ
              </span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span
                className="text"
                style={{ fontSize: "14px", color: "#06b6d4" }}
              >
                Giảm giá
              </span>
              <span
                className="text"
                style={{ fontSize: "14px", color: "#06b6d4" }}
              >
                0đ
              </span>
            </div>

            <hr />

            <div className="d-flex justify-content-between mb-3">
              <span style={{ fontSize: "16px" }}>
                <strong>Tổng cộng</strong>
              </span>
              <span style={{ fontSize: "18px", color: "#06b6d4" }}>
                <strong> {total.toLocaleString()}đ</strong>
              </span>
            </div>

            <button
              className="btn w-100 text-white"
              style={{ backgroundColor: "#06b6d4" }}
              onClick={handleCheckout}
            >
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkouts;
