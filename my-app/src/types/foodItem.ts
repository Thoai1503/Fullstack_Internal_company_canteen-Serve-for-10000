export interface FoodItem {
  id: number;
  name: string;
  type_id: number;
  description: string;
  slug: string;
  type_name: string;
  inCart?: boolean;
  cart?: {
    id: number;
    quantity: number;
  };
  price: number;
  image: string;
  is_vegetarian: boolean;
  is_enabled: boolean;
}
