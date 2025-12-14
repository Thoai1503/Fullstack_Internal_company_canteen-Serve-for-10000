package tinhvomon.com.models;

public class FoodIngredient {
	public FoodIngredient(int food_id, int ingredient_id, double quantity, int unit_id) {
		super();
		this.food_id = food_id;
		this.ingredient_id = ingredient_id;
		this.recipe_quantity = quantity;
		this.unit_id = unit_id;
	}
	public FoodIngredient() {
		
	}
	public int getFood_id() {
		return food_id;
	}
	public void setFood_id(int food_id) {
		this.food_id = food_id;
	}
	public int getIngredient_id() {
		return ingredient_id;
	}
	public void setIngredient_id(int ingredient_id) {
		this.ingredient_id = ingredient_id;
	}
	public double getQuantity() {
		return recipe_quantity;
	}
	public void setQuantity(double quantity) {
		this.recipe_quantity = quantity;
	}
	public int getUnit_id() {
		return unit_id;
	}
	public void setUnit_id(int unit_id) {
		this.unit_id = unit_id;
	}
	private int food_id;
	private int ingredient_id;
	private double recipe_quantity;
	private int unit_id;
	private Double quantity;
	public double getRecipe_quantity() {
		return recipe_quantity;
	}
	public void setRecipe_quantity(double recipe_quantity) {
		this.recipe_quantity = recipe_quantity;
	}
	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}

}
