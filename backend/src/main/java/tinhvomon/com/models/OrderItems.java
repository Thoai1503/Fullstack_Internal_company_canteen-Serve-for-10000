package tinhvomon.com.models;

public class OrderItems {
 public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getOrder_id() {
		return order_id;
	}
	public void setOrder_id(int order_id) {
		this.order_id = order_id;
	}
	public int getFood_id() {
		return food_id;
	}
	public void setFood_id(int food_id) {
		this.food_id = food_id;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public Double getUnit_price() {
		return unit_price;
	}
	public void setUnit_price(Double unit_price) {
		this.unit_price = unit_price;
	}
	public Double getTotal_price() {
		return total_price;
	}
	public void setTotal_price(Double total_price) {
		this.total_price = total_price;
	}
 public OrderItems(int id, int order_id, int food_id, int quantity, Double unit_price, Double total_price) {
		super();
		this.id = id;
		this.order_id = order_id;
		this.food_id = food_id;
		this.quantity = quantity;
		this.unit_price = unit_price;
		this.total_price = total_price;
	}
 public OrderItems() {}
 private int id;
 private int order_id;
 private int food_id;
 private int quantity;
 private Double unit_price;
 private Double total_price;
 public FoodItem getFood() {
	return food;
}
 public void setFood(FoodItem food) {
	this.food = food;
 }
 private FoodItem food;
}
