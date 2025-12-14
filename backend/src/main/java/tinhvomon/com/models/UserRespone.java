package tinhvomon.com.models;

public class UserRespone {
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getToken() {
		return accesstoken;
	}
	public void setToken(String token) {
		this.accesstoken = token;
	}
	private String email;
	public UserRespone(String email, String role, String accesstoken,String refreshToken) {
		super();
		this.email = email;
		this.role = role;
		this.accesstoken = accesstoken;
		this.refreshToken= refreshToken;
	}
	private String role;
	private String accesstoken;
	public String getRefreshToken() {
		return refreshToken;
	}
	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}
	private String refreshToken;

}
