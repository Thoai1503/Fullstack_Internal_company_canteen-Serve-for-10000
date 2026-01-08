// app/food/page.tsx
import { Suspense } from "react";
import { API_URL, INTERNAL_API } from "@/helper/api";
import FoodList from "@/components/admin/food_page/FoodList";
import { FoodItem } from "@/types/foodItem";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Loading Skeleton Component
function FoodListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="border rounded-lg p-4 animate-pulse">
          <div className="flex gap-4">
            <div className="w-24 h-24 bg-gray-200 rounded" />
            <div className="flex-1 space-y-3">
              <div className="h-5 bg-gray-200 rounded w-1/3" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Error Component
function ErrorDisplay({ error }: { error: string }) {
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <svg
            className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-red-900 mb-1">
              Lỗi tải dữ liệu
            </h3>
            <p className="text-red-700 mb-4">
              Không thể tải danh sách món ăn. Vui lòng thử lại sau.
            </p>
            {error && (
              <details className="text-sm text-red-600">
                <summary className="cursor-pointer font-medium">
                  Chi tiết lỗi
                </summary>
                <pre className="mt-2 p-2 bg-red-100 rounded overflow-auto">
                  {error}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Tải lại trang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Data fetching component
async function FoodData() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const res = await axios.get(`${INTERNAL_API}/fooditem`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (res.status === 401) {
      redirect("/login");
    }
    if (res.status === 403) {
      return (
        <ErrorDisplay error={`Unexpected response status: ${res.status}`} />
      );
    }

    const foodItems = res.data as FoodItem[];

    if (!foodItems || foodItems.length === 0) {
      return (
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p className="text-gray-500 text-lg">Chưa có món ăn nào</p>
        </div>
      );
    }

    return <FoodList list={foodItems} />;
  } catch (err: any) {
    console.error("API Error:", err);

    if (err.response?.status === 401) {
      redirect(`/login?error=unauthorized`);
    }
    if (err.response?.status === 403) {
      return (
        <ErrorDisplay error="Bạn không có quyền truy cập tài nguyên này." />
      );
    }

    return <ErrorDisplay error={err.message || "Unknown error"} />;
  }
}

// Main page component
export default function Food() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Quản lý món ăn</h2>
        <p className="text-gray-600 mt-2">
          Quản lý và cập nhật danh sách món ăn của bạn
        </p>
      </div>

      <Suspense fallback={<FoodListSkeleton />}>
        <FoodData />
      </Suspense>
    </div>
  );
}
