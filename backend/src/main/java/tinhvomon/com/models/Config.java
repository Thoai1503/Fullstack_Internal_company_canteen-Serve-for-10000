package tinhvomon.com.models;

public class Config {
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public Config(String key, String type, String value) {
		super();
		this.key = key;
		this.type = type;
		this.value = value;
	}
	
	public Config() {}
	private String key;
	private String type;
	private String value;
	
	
	

}
