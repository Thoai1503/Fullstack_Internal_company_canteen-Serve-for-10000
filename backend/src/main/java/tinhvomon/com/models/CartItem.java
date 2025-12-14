package tinhvomon.com.models;

import java.time.LocalDateTime;

public class CartItem {
private int id;
private FoodItem food;
public FoodItem getFood() {
	return food;
}
public void setFood(FoodItem food) {
	this.food = food;
}
public CartItem(int id, int food_id, int quantity,int cart_id, Double unit_price, LocalDateTime add_date) {
	super();
	this.id = id;
	this.food_id = food_id;
	this.quantity = quantity;
	this.unit_price = unit_price;
	this.cart_id= cart_id;
	this.add_date = add_date;
}
public CartItem() {}
public int getId() {
	return id;
}
public void setId(int id) {
	this.id = id;
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
public LocalDateTime getAdd_date() {
	return add_date;
}
public void setAdd_date(LocalDateTime add_date) {
	this.add_date = add_date;
}
private int food_id;
private int quantity;
private int cart_id;
public int getCart_id() {
	return cart_id;
}
public void setCart_id(int cart_id) {
	this.cart_id = cart_id;
}
private Double unit_price;
private LocalDateTime add_date;
}
