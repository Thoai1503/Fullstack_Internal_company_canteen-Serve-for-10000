package tinhvomon.com.models;

public class IngredientInventory {

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getBase_unit_id() {
		return base_unit_id;
	}
	public void setBase_unit_id(int base_unit_id) {
		this.base_unit_id = base_unit_id;
	}
	public double getStock() {
		return stock;
	}
	public void setStock(double stock) {
		this.stock = stock;
	}
	public double getPrice_per_unit() {
		return price_per_unit;
	}
	public void setPrice_per_unit(double price_per_unit) {
		this.price_per_unit = price_per_unit;
	}
	public Units getUnits() {
		return units;
	}
	public void setUnits(Units units) {
		this.units = units;
	}
	private int id;
	public IngredientInventory(int id, String name, int base_unit_id, double stock, double price_per_unit) {
		super();
		this.id = id;
		this.name = name;
		this.base_unit_id = base_unit_id;
		this.stock = stock;
		this.price_per_unit = price_per_unit;
	}
	public IngredientInventory() {
		
	}
	
	private String name;
	private int base_unit_id;
	private Units units;
	private double stock;
	private double price_per_unit;
}
