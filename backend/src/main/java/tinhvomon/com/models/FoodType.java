package tinhvomon.com.models;
import jakarta.persistence.*;

@Entity
@Table(name= "FoodType")

public class FoodType {
	public FoodType(int id, String name, String slug) {
		super();
		this.id = id;
		this.name = name;
		this.slug = slug;
		//this.is_active = is_active;
	}
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id ;
	private String name;
	private String slug;
	
	   public FoodType() {
	    }
	
	//private boolean is_active;
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
	public String getSlug() {
		return slug;
	}
	public void setSlug(String slug) {
		this.slug = slug;
	}
//	public boolean isIs_active() {
//		return is_active;
//	}
//	public void setIs_active(boolean is_active) {
//		this.is_active = is_active;
//	}
	
}
