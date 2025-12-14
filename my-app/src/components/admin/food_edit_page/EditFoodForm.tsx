"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FoodItem } from "@/types/foodItem";
import axios from "axios";
import { headers } from "next/headers";
import http from "@/lib/http";
import { FoodType } from "@/types/foodType";

type Food = {
  id?: string;
  name: string;
  description?: string;
  price?: number;
  category?: string;
  available?: boolean;
  imageUrl?: string;
};

export default function EditFoodForm({
  initialData,
  foodType,
}: {
  initialData: FoodItem;
  foodType: FoodType[];
}) {
  const router = useRouter();
  const [food, setFood] = useState<Partial<FoodItem>>({
    id: initialData.id,
    name: "",
    description: "",
    slug: "",
    type_id: 0,
    type_name: "",
    price: 0,
    is_enabled: true,
    is_vegetarian: true,
    image: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    initialData?.image ?? null
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFood((s) => ({ ...s, ...initialData }));
    setPreview(
      initialData.image
        ? `http://localhost:8000/Thoai-pro-spring/upload/${initialData.image}`
        : null
    );
  }, [initialData]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    if (type === "checkbox") {
      setFood((s) => ({ ...s, [name]: (target as HTMLInputElement).checked }));
    } else if (type === "number") {
      setFood((s) => ({ ...s, [name]: Number(value) }));
    } else {
      setFood((s) => ({ ...s, [name]: value }));
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (!f) {
      setPreview(food.image ?? null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPreview(String(reader.result));
    reader.readAsDataURL(f);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const form = new FormData();
      const itemBlob = new Blob([JSON.stringify(food)], {
        type: "application/json",
      });

      // form.append("name", food.name ?? "");
      // form.append("description", food.description ?? "");
      // form.append("price", String(food.price ?? 0));
      // form.append("type_id", String(food.type_id));
      // form.append("is_enabled", String(Boolean(food.is_enabled)));
      form.append("item", itemBlob);
      if (file) form.append("image", file);

      alert("Form data:" + JSON.stringify(food));

      const id = food.id ?? (initialData && (initialData as any).id);
      const res = await http.post(`/fooditem/${id}`, form);
      if (!res) {
        throw new Error(`Save failed: ${res}`);
      }

      console.log("Res: " + res.data);
      // navigate back to listing or refresh
      //  router.push("/admin/food");
      alert("Success");
    } catch (err: any) {
      setError(err?.message ?? "Unknown error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      {error && (
        <div className="col-12">
          <div className="alert alert-danger">{error}</div>
        </div>
      )}

      <div className="col-md-6">
        <label className="form-label">Name</label>
        <input
          name="name"
          value={food.name}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Loại</label>

        <select
          className="form-select"
          aria-label="Default select example"
          name="type_id"
          value={food.type_id}
          onChange={handleChange}
        >
          {foodType.map((item) => (
            <option selected={food.id == item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-4">
        <label className="form-label">Price</label>
        <input
          name="price"
          type="number"
          step="1000"
          value={food.price ?? 0}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="col-md-4">
        <label className="form-label">Available</label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="available"
            name="is_enabled"
            checked={Boolean(food.is_enabled)}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="available">
            Available to sell
          </label>
        </div>
      </div>

      <div className="col-12">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          value={food.description}
          onChange={handleChange}
          className="form-control"
          rows={4}
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Image</label>
        <input
          type="file"
          accept="*"
          className="form-control"
          onChange={handleFileChange}
        />
        {preview && (
          <div className="mt-2">
            <img
              src={`${preview}`}
              alt="preview"
              style={{ maxWidth: 200, maxHeight: 200 }}
            />
          </div>
        )}
      </div>

      <div className="col-12">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => router.back()}
          disabled={saving}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
