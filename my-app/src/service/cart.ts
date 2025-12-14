import http from "@/lib/http";

export const addToCart = async (
  user_id: number,
  food_id: number
): Promise<any> => {
  return await http
    .post(`/cart/${user_id}/food/${food_id}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const updateQuantity = async (
  id: number,
  quantity: number
): Promise<any> => {
  return await http
    .post(`/cartitem/${id}`, { id, quantity })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
