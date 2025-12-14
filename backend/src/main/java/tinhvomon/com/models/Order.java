package tinhvomon.com.models;

import java.time.LocalDateTime;

public class Order {

	private int id;
	public Order(int id, int user_id, Double total_amount, int status, LocalDateTime created_at) {
		super();
		this.id = id;
		this.user_id = user_id;
		this.total_amount = total_amount;
		this.status = status;
		this.created_at = created_at;
	}
	public Order() {}
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
	public Double getTotal_amount() {
		return total_amount;
	}
	public void setTotal_amount(Double total_amount) {
		this.total_amount = total_amount;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public LocalDateTime getCreated_at() {
		return created_at;
	}
	public void setCreated_at(LocalDateTime created_at) {
		this.created_at = created_at;
	}
	private int user_id;
	private Double total_amount;
	private CancellationRequest cancellation_state;
	public CancellationRequest getCancellation_status() {
		return this.cancellation_state;
	}
	public void setCancellation_status(CancellationRequest cancellation_state) {
		this.cancellation_state = cancellation_state;
	}
	private int status;
	public User getUser() {	
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	private User user;
	private String cancel_reason;
    public String getCancel_reason() {
		return cancel_reason;
	}
	public void setCancel_reason(String cancel_reason) {
		this.cancel_reason = cancel_reason;
	}
	private LocalDateTime created_at;
	
}
