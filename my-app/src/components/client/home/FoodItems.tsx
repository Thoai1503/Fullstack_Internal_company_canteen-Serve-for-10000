"use client";
import { useCartFeature } from "@/hook/admin/useCartFeature";
import { FoodItem } from "@/types/foodItem";
import React, { useState } from "react";

const FoodItems = ({
  item,
  idx,
  user_id,
}: {
  item: FoodItem;
  idx: number;
  user_id: number;
}) => {
  const [foodItem, setFoodItem] = useState<FoodItem>(item);
  const { handleAdd, handleUpdate } = useCartFeature(setFoodItem, foodItem);
  return (
    <div key={idx} className="col-lg-4 menu-item">
      <a href={foodItem.image} className="glightbox">
        <img
          src={`http://localhost:8000/Thoai-pro-spring/upload/${foodItem.image.trim()}?h=120&fit=crop&auto=format&dpr=2 2x`}
          className="menu-img img-fluid"
          alt={foodItem.image}
        />
      </a>
      <h4>{foodItem.name}</h4>
      <p className="ingredients">{foodItem.description.slice(0, 20)}</p>
      <p className="price">{foodItem.price}</p>
      <div className="d-flex justify-content-center align-items-center pb-2 mb-1 ">
        {foodItem.inCart ? (
          <button
            className=" d-flex justify-content-between btn btn-outline-primary btn-sm"
            style={{ width: "200px" }}
          >
            <div
              className="decrease-btn"
              onClick={() => {
                handleUpdate(foodItem.cart?.id!, foodItem.cart?.quantity! - 1);
              }}
              style={{ fontSize: 22 }}
            >
              -
            </div>
            <div style={{ fontSize: 20 }}>{foodItem.cart?.quantity}</div>
            <div
              className="increase-btn"
              onClick={() => {
                handleUpdate(foodItem.cart?.id!, foodItem.cart?.quantity! + 1);
              }}
              style={{ fontSize: 22 }}
            >
              +
            </div>
          </button>
        ) : (
          <button
            type="button"
            style={{ width: "180px" }}
            onClick={() => handleAdd(user_id, foodItem.id)}
            className="btn btn-outline-primary font-size-12 d-flex justify-content-center"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default FoodItems;
