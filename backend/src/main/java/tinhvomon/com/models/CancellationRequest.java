package tinhvomon.com.models;

import java.time.LocalDateTime;

public class CancellationRequest {
    public int getCancellation_status() {
		return cancellation_status;
	}
	public void setCancellation_status(int cancellation_status) {
		this.cancellation_status = cancellation_status;
	}
	public String getCancellation_request_reason() {
		return cancellation_request_reason;
	}
	public void setCancellation_request_reason(String cancellation_request_reason) {
		this.cancellation_request_reason = cancellation_request_reason;
	}
	public LocalDateTime getCancellation_request_date() {
		return cancellation_request_date;
	}
	public void setCancellation_request_date(LocalDateTime cancellation_request_date) {
		this.cancellation_request_date = cancellation_request_date;
	}
	public int getCancellation_processed_by() {
		return cancellation_processed_by;
	}
	public void setCancellation_processed_by(int cancellation_processed_by) {
		this.cancellation_processed_by = cancellation_processed_by;
	}
	public LocalDateTime getCancellation_processed_date() {
		return cancellation_processed_date;
	}
	public void setCancellation_processed_date(LocalDateTime cancellation_processed_date) {
		this.cancellation_processed_date = cancellation_processed_date;
	}
	public String getCancellation_admin_note() {
		return cancellation_admin_note;
	}
	public void setCancellation_admin_note(String cancellation_admin_note) {
		this.cancellation_admin_note = cancellation_admin_note;
	}
	public CancellationRequest() {
		
	}
	public CancellationRequest(int cancellation_status, String cancellation_request_reason,
			int cancellation_processed_by, String cancellation_admin_note) {
		super();
		this.cancellation_status = cancellation_status;
		this.cancellation_request_reason = cancellation_request_reason;
		this.cancellation_processed_by = cancellation_processed_by;
		this.cancellation_admin_note = cancellation_admin_note;
	}
	private int cancellation_status;
    private String cancellation_request_reason;
    private LocalDateTime cancellation_request_date;
    private int cancellation_processed_by;
    private LocalDateTime cancellation_processed_date;
    private String cancellation_admin_note;
    public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	private int status;
}
