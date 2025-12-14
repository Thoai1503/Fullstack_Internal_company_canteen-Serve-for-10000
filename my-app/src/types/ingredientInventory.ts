import { Unit } from "./unit";

export interface IngredientInventory {
  id: number;
  name: string;
  base_unit_id: number;
  units: Unit;
  stock: number;
  price_per_unit: number;
}
