import axios from "axios";
import EditFoodForm from "@/components/admin/food_edit_page/EditFoodForm"; // dùng alias
import { cookies } from "next/headers";
import { FoodType } from "@/types/foodType";

export default async function Page({ params }: { params: Promise<any> }) {
  const { id } = await params;

  const cookieStore = await cookies(); // ❗ không dùng await
  const token = cookieStore.get("token")?.value;

  const { data } = await axios.get(`http://backend:8080/fooditem/${id}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  const { data: foodT } = await axios.get(`http://backend:8080/foodtype`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!data) {
    return (
      <div className="container py-4">
        <h1>Edit Food</h1>
        <div className="alert alert-danger">Failed to load item</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="mb-3">Edit Food</h1>
      {/* @ts-ignore */}
      <EditFoodForm initialData={data} foodType={foodT as FoodType[]} />
    </div>
  );
}
