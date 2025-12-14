package tinhvomon.com.models;

public class User {
	public User(int id, String email, String password,String role) {
		super();
		this.id = id;
		this.email = email;
		this.password = password;
		this.role= role;
	}
	public User() {}
	private int id;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	private String email;
	private String password;
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	private String role;

   
}
