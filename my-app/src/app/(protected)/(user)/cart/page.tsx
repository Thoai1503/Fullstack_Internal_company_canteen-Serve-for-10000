"use server";
import { API_URL, INTERNAL_API } from "@/helper/api";
import CartClient from "@/components/client/cart/CartClient";
import { CartItem } from "@/types/cartItem";
import axios from "axios";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function Cart() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user_id = Number(cookieStore.get("user")?.value);
  if (!user_id) {
    return redirect("/login");
  }
  const { data: cartItems } = await axios.get<CartItem[]>(
    `${INTERNAL_API}/cartitem/user/${user_id}`,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    }
  );

  return <CartClient initialCartItems={cartItems} />;
}
