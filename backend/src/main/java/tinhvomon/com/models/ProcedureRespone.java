package tinhvomon.com.models;

public class ProcedureRespone {

	public ProcedureRespone(int code, String message) {
		super();
		this.code = code;
		this.message = message;
	}
	public ProcedureRespone() {}
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	private int code;
	private String message;
	
}
