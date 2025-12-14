import { addToCart, updateQuantity } from "@/service/cart";
import { FoodItem } from "@/types/foodItem";
import { useMutation } from "@tanstack/react-query";

export const useCartFeature = (
  setFoodItem: React.Dispatch<React.SetStateAction<FoodItem>>,
  foodItem: FoodItem
) => {
  const { mutate: add } = useMutation({
    mutationFn: ({ user_id, food_id }: { user_id: number; food_id: number }) =>
      addToCart(user_id, food_id),
    onSuccess: (data) => {
      console.log("data: " + JSON.stringify(data));
      setFoodItem({
        ...foodItem,
        inCart: true,
        cart: { id: data.id, quantity: data.quantity },
      });
    },
    onError: (error) => {
      alert(error);
    },
  });
  const handleAdd = (user_id: number, food_id: number) => {
    // alert("Info: " + user_id + " " + food_id);
    // return;
    add({ user_id, food_id });
  };

  const { mutate: update } = useMutation({
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
      updateQuantity(id, quantity),
    onSuccess: (data) => {
      console.log("data: " + JSON.stringify(data));
      setFoodItem({
        ...foodItem,
        cart: { ...foodItem.cart!, quantity: data.quantity },
      });
    },
  });
  const handleUpdate = (id: number, quantity: number) => {
    update({ id, quantity });
  };
  return { handleAdd, handleUpdate };
};
