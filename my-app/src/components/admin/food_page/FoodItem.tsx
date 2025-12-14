"use client";
import type { FoodItem } from "@/types/foodItem";
import Image from "next/image";
import React, { useState } from "react";
import AddImageModal from "./AddImageModal";

interface FoodItemsProps {
  item: FoodItem;
  index: number;
}

function FoodItems({ item, index }: FoodItemsProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const imageUrl =
    item.image.trim() !== "default.jpg"
      ? `http://localhost:8000/Thoai-pro-spring/upload/${item.image.trim()}`
      : "https://www.fivebranches.edu/wp-content/uploads/2021/08/default-image.webp";

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>
          <Image
            src={imageUrl}
            alt={`Hình ảnh ${item.name}`}
            width={150}
            height={100}
            className="rounded"
            style={{ objectFit: "cover" }}
            unoptimized // Add this if using external URLs
          />
        </td>
        <td>{item.name}</td>
        <td>{item.type_name}</td>
        <td>{item.price.toLocaleString("vi-VN")} VNĐ</td>
        <td>
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-primary"
              onClick={handleShow}
              aria-label={`Tải ảnh lên cho ${item.name}`}
              title="Tải ảnh lên"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-upload"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
              </svg>
            </button>

            <a
              href={`/admin/food/${item.id}`}
              className="btn btn-outline-info"
              aria-label={`Chỉnh sửa ${item.name}`}
              title="Chỉnh sửa"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil-square"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fillRule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                />
              </svg>
            </a>
          </div>
        </td>
      </tr>

      <AddImageModal show={show} handleClose={handleClose} id={item.id} />
    </>
  );
}

export default FoodItems;
