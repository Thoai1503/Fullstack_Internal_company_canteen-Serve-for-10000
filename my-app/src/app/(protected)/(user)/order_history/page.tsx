import { API_URL, INTERNAL_API } from "@/helper/api";
import OrderHistoryItem from "@/components/client/order_history/OrderHistoryItem";
import { PREPARE_TIME } from "@/helper/key";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import React from "react";

const OrderHistory = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user_id = Number(cookieStore.get("user")?.value);
  console.log("User id:" + user_id);
  if (!user_id) {
    return redirect("/login");
  }
  const { data: orders } = await axios.get(
    `${INTERNAL_API}/order/user/${user_id}`,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    }
  );
  const { data: time } = await axios.get(
    `${INTERNAL_API}/config/get?key=${PREPARE_TIME}`,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    }
  );
  console.log("Prepare time: " + time);
  console.log("Current time: " + time > Date.now().toLocaleString());
  return (
    <div className="container">
      <h2>Lịch sử đơn hàng</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tổng tiền</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Ngày tạo</th>
            <th scope="col">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item: any) => {
            let data = {
              status: "",
              badge: "",
            };
            switch (item.status) {
              case 3:
                data.status = "Đã huỷ";
                data.badge = "danger";
                break;
              case 2:
                data.status = "Đã thanh toán";
                data.badge = "success";
                break;
              case 1:
                data.status = "Đang thanh toán";
                data.badge = "warning";
                break;
            }
            const created_date = new Date(item.created_at).toLocaleString(
              "vi-VN"
            );
            return <OrderHistoryItem key={item.id} item={item} time={time} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
