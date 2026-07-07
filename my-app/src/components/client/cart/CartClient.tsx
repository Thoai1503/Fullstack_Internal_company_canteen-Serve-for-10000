"use client";

import { API_URL } from "@/helper/api";
import { deleteCartItem, updateQuantity } from "@/service/cart";
import { CartItem } from "@/types/cartItem";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import React, { useMemo, useState } from "react";

type CartClientProps = {
  initialCartItems: CartItem[];
};

const CartClient = ({ initialCartItems }: CartClientProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(
    initialCartItems || [],
  );

  const total = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + (item.food.price || 0) * item.quantity,
        0,
      ),
    [cartItems],
  );

  const { mutate: mutateQuantity, isPending: isUpdatingQuantity } = useMutation(
    {
      mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
        updateQuantity(id, quantity),
      onSuccess: (data, variables) => {
        const nextQuantity = data?.quantity ?? variables.quantity;
        setCartItems((prev) =>
          prev.map((item) =>
            item.id === variables.id
              ? { ...item, quantity: nextQuantity }
              : item,
          ),
        );
      },
      onError: () => {
        alert("Cập nhật số lượng thất bại");
      },
    },
  );

  const { mutate: mutateDelete, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteCartItem(id),
    onSuccess: (_, id) => {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    },
    onError: () => {
      alert("Xóa sản phẩm khỏi giỏ hàng thất bại");
    },
  });

  const handleDecrease = (item: CartItem) => {
    if (item.quantity <= 1) {
      return;
    }
    mutateQuantity({ id: item.id, quantity: item.quantity - 1 });
  };

  const handleIncrease = (item: CartItem) => {
    mutateQuantity({ id: item.id, quantity: item.quantity + 1 });
  };

  const handleDelete = (id: number) => {
    const ok = window.confirm("Bạn có chắc muốn xóa món này khỏi giỏ hàng?");
    if (!ok) {
      return;
    }
    mutateDelete(id);
  };

  const handleClearAll = () => {
    if (cartItems.length === 0) {
      return;
    }
    const ok = window.confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng?");
    if (!ok) {
      return;
    }
    cartItems.forEach((item) => mutateDelete(item.id));
  };

  return (
    <div className="container">
      <div className="container">
        <div className="row mt-4">
          <div className="col-12 col-lg-8 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>
                <strong>Giỏ hàng ({cartItems.length})</strong>
              </h5>
              <button
                type="button"
                className="btn btn-link p-0"
                style={{ fontSize: "13px", color: "#63b6c5ff" }}
                onClick={handleClearAll}
                disabled={isDeleting || cartItems.length === 0}
              >
                Xoá tất cả
              </button>
            </div>
            <div className="bg-white p-3 rounded">
              <div
                className="row mb-3 d-none d-lg-flex"
                style={{ borderBottom: "1px solid lightgray" }}
              >
                <div className="col-lg-6 text">
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
                <div className="col-lg-1 text">
                  <strong>Xóa</strong>
                </div>
              </div>

              <div>
                {cartItems.length === 0 && (
                  <div className="text-center py-5 text-muted">
                    Giỏ hàng trống
                  </div>
                )}

                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item pb-3 mb-3">
                    <div className="row align-items-center d-none d-lg-flex">
                      <div className="col-lg-2">
                        <img
                          width={80}
                          src={`${API_URL}/upload/${item.food.image}`}
                          alt={item.food.image}
                        />
                      </div>
                      <div className="col-lg-4">
                        <div className="row">
                          <p className="cart-item title mb-0 text">
                            {item.food.name}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-2">
                        <span className="item-price d-flex justify-content-end">
                          <strong className="text">
                            {(item.food.price || 0).toLocaleString("vi-VN")}đ
                          </strong>
                        </span>
                      </div>
                      <div className="col-lg-2 d-flex justify-content-center">
                        <div className="d-flex align-items-center gap-2">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            disabled={item.quantity <= 1 || isUpdatingQuantity}
                            onClick={() => handleDecrease(item)}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            disabled={isUpdatingQuantity}
                            onClick={() => handleIncrease(item)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-lg-1">
                        <span className="item-price d-flex justify-content-end">
                          <strong className="text">
                            {(
                              (item.food.price || 0) * item.quantity
                            ).toLocaleString("vi-VN")}
                            đ
                          </strong>
                        </span>
                      </div>
                      <div className="col-lg-1 d-flex justify-content-end">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(item.id)}
                          disabled={isDeleting}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>

                    <div className="d-lg-none">
                      <div className="d-flex gap-3 mb-2">
                        <img
                          width={80}
                          height={80}
                          style={{ objectFit: "contain" }}
                          src={`${API_URL}/upload/${item.food.image}`}
                          alt={item.food.image}
                        />
                        <div className="flex-grow-1">
                          <p className="mb-1">
                            <strong>{item.food.name}</strong>
                          </p>
                          <p className="mb-1">
                            <strong>
                              {(item.food.price || 0).toLocaleString("vi-VN")}đ
                            </strong>
                          </p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <div className="d-flex align-items-center gap-2">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            disabled={item.quantity <= 1 || isUpdatingQuantity}
                            onClick={() => handleDecrease(item)}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            disabled={isUpdatingQuantity}
                            onClick={() => handleIncrease(item)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(item.id)}
                          disabled={isDeleting}
                        >
                          Xóa
                        </button>
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
                <p>{total.toLocaleString("vi-VN")} đ</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <h6>Thành tiền:</h6>
                <h6 style={{ color: "#1586ddff" }}>
                  {total.toLocaleString("vi-VN")} đ
                </h6>
              </div>

              <hr />
              <p style={{ fontSize: "14px", color: "gray" }}>
                Giá đã bao gồm VAT (nếu có)
              </p>

              <Link
                href="/checkout"
                className="btn btn-outline-primary w-100 mt-3"
              >
                Thanh toán
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
