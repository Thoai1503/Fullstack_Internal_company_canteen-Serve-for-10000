package tinhvomon.com.models;

import java.time.LocalDateTime;

public class OrderStatusHistory {  
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
	public int getOld_status() {
		return old_status;
	}
	public void setOld_status(int old_status) {
		this.old_status = old_status;
	}
	public int getNew_status() {
		return new_status;
	}
	public void setNew_status(int new_status) {
		this.new_status = new_status;
	}
	public int getChanged_by() {
		return changed_by;
	}
	public void setChanged_by(int changed_by) {
		this.changed_by = changed_by;
	}
	public int getOld_cancellation_status() {
		return old_cancellation_status;
	}
	public void setOld_cancellation_status(int old_cancellation_status) {
		this.old_cancellation_status = old_cancellation_status;
	}
	public int getNew_cancellation_status() {
		return new_cancellation_status;
	}
	public void setNew_cancellation_status(int new_cancellation_status) {
		this.new_cancellation_status = new_cancellation_status;
	}
	public String getChanged_by_role() {
		return changed_by_role;
	}
	public void setChanged_by_role(String changed_by_role) {
		this.changed_by_role = changed_by_role;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public LocalDateTime getReason() {
		return reason;
	}
	public void setReason(LocalDateTime reason) {
		this.reason = reason;
	}
	public LocalDateTime getCreated_at() {
		return created_at;
	}
	public void setCreated_at(LocalDateTime created_at) {
		this.created_at = created_at;
	}
	public OrderStatusHistory(int id, int order_id, int old_status, int new_status, int changed_by,
			int old_cancellation_status, int new_cancellation_status, String changed_by_role, String note,
			LocalDateTime reason, LocalDateTime created_at) {
		super();
		this.id = id;
		this.order_id = order_id;
		this.old_status = old_status;
		this.new_status = new_status;
		this.changed_by = changed_by;
		this.old_cancellation_status = old_cancellation_status;
		this.new_cancellation_status = new_cancellation_status;
		this.changed_by_role = changed_by_role;
		this.note = note;
		this.reason = reason;
		this.created_at = created_at;
	}
	public OrderStatusHistory() {
		
	}
	private int id;
	private int order_id;
	private int old_status;
	private int new_status;
	private int changed_by;
	public User getChanged_by_user() {
		return changed_by_user;
	}
	public void setChanged_by_user(User changed_by_user) {
		this.changed_by_user = changed_by_user;
	}
	private User changed_by_user;
	private int old_cancellation_status;
	private int new_cancellation_status;
	private String changed_by_role;
	private String note;
	private LocalDateTime reason;
	private LocalDateTime created_at;
	
}
