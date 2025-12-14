package tinhvomon.com.models;

import java.time.LocalDateTime;

public class FoodItem {
	private int id;
	private String name;
	
	private int type_id;
	private String description;
	private  double price;
	public String getType_name() {
		return type_name;
	}
	public void setType_name(String type_name) {
		this.type_name = type_name;
	}
	private String type_name;
	private String image;
	public String getSlug() {
		return slug;
	}
	public void setSlug(String slug) {
		this.slug = slug;
	}
	private String slug;
	private boolean is_vegetarian;
	private boolean is_enabled;

     public FoodItem(int id, String name, int type_id, String description, double price, String image,
			boolean is_vegetarian, boolean is_enabled) {
		super();
		this.id = id;
		this.name = name;
		this.type_id = type_id;
		this.description = description;
		this.price = price;
		this.image = image;
		this.is_vegetarian = is_vegetarian;
		this.is_enabled = is_enabled;
	}
     public FoodItem() {
    	 
     }
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
	 public int getType_id() {
		 return type_id;
	 }
	 public void setType_id(int type_id) {
		 this.type_id = type_id;
	 }
	 public String getDescription() {
		 return description;
	 }
	 public void setDescription(String description) {
		 this.description = description;
	 }
	 public double getPrice() {
		 return price;
	 }
	 public void setPrice(double price) {
		 this.price = price;
	 }
	 public String getImage() {
		 return image;
	 }
	 public void setImage(String image) {
		 this.image = image;
	 }
	 public boolean isIs_vegetarian() {
		 return is_vegetarian;
	 }
	 public void setIs_vegetarian(boolean is_vegetarian) {
		 this.is_vegetarian = is_vegetarian;
	 }
	 public boolean isIs_enabled() {
		 return is_enabled;
	 }
	 public void setIs_enabled(boolean is_enabled) {
		 this.is_enabled = is_enabled;
	 }
	
     
     	
}
