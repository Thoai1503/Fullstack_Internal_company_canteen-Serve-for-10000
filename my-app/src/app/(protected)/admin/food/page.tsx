import { API_URL, INTERNAL_API } from "@/helper/api";
import FoodList from "@/components/admin/food_page/FoodList";
import { FoodItem } from "@/types/foodItem";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
// app/food/page.tsx

export default async function Food() {
  const cookieStore = await cookies(); // <--- Thêm await
  const token = cookieStore.get("token")?.value;

  const res = await axios
    .get(`${INTERNAL_API}/fooditem`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
    .then((res) => {
      if (res.status === 401) return redirect("/login");
      return res.data;
    })
    .catch((err) => {
      console.log("Token error: " + err.response);
      return redirect(`/login?error=${err.response}`);
    });

  // if (res.status !== 200) {
  //   throw new Error("Failed to fetch food items");
  // }

  const post = res as FoodItem[];
  console.log("Data: " + JSON.stringify(post));

  return (
    <div>
      <h2>Quản lý món ăn</h2>

      <FoodList list={post} />
    </div>
  );
}
