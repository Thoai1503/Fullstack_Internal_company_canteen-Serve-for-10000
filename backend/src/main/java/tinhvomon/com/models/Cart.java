package tinhvomon.com.models;

import java.time.LocalDateTime;

public class Cart {
	public Cart(int id, int user_id, LocalDateTime created_at) {
		super();
		this.id = id;
		this.user_id = user_id;
		this.created_at = created_at;
	}
	public Cart () {}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public LocalDateTime getcreated_at() {
		return created_at;
	}
	public void setcreated_at(LocalDateTime created_at) {
		this.created_at = created_at;
	}
	private int id;
	private int user_id;
	private LocalDateTime created_at;

}
