import { API_URL } from "@/helper/api";
import CheckoutButton from "@/components/CheckoutButton";
import Checkouts from "@/components/client/checkout/Checkouts";
import PaymentMethod from "@/components/client/checkout/PaymentMethod";
import { CartItem } from "@/types/cartItem";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import React from "react";

export default async function Checkout() {
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
  const paymentList = [
    {
      head: "Thanh toán VNPAYQR (chưa hỗ trợ cho môi trường test)",
      title: "Thanh toán bằng mã QR VNPAY  ",
      method: "NCB",
      code: "vnpay",
    },
    {
      head: "ATM nội địa (test được)",
      title: "Thanh toán qua thẻ ATM nội địa",
      method: "VNBANK",
      code: "vnpay",
    },
    {
      head: "Thanh toán MOMO",
      title: "Thanh toán qua ứng dụng MOMO",
      method: "momo",
      code: "momo",
    },
  ];
  return (
    <div className="container">
      <Checkouts
        paymentList={paymentList}
        cartItems={cartItems}
        user_id={user_id}
      />
    </div>
  );
}
