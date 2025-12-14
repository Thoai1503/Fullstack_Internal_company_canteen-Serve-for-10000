import { API_URL } from "@/helper/api";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user_id = Number(cookieStore.get("user")?.value);
  console.log("User id:" + user_id);
  if (!user_id) {
    return redirect("/login");
  }
  const { id } = await params;

  console.log("Id: " + id);

  const { data: orders } = await axios.get(`${API_URL}/orderitem/order/${id}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return (
    <div className="container">
      <h2>Lịch sử đơn hàng</h2>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col" className="text-center">
                #
              </th>
              <th scope="col" className="text-center">
                Hình ảnh
              </th>
              <th scope="col" className="text-center">
                Tên món
              </th>
              <th scope="col" className="text-center">
                Số lượng
              </th>
              <th scope="col" className="text-center">
                Thành tiền
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item: any, index: number) => (
              <tr key={item.id || index}>
                <th scope="row" className="align-middle text-center">
                  {index + 1}
                </th>
                <td className="align-middle text-center">
                  <div
                    className="position-relative d-inline-block"
                    style={{ width: "80px", height: "80px" }}
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
                </td>
                <td className="align-middle text-center">{item.food.name}</td>
                <td className="align-middle text-center">{item.quantity}</td>
                <td className="align-middle text-center">
                  {item.total_price.toLocaleString("vi-VN")} VNĐ
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
