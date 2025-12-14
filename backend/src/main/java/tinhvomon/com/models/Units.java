package tinhvomon.com.models;

public class Units {
  public Units(int id, String name, Double conversion_factor) {
		super();
		this.id = id;
		this.name = name;
		this.conversion_factor = conversion_factor;
	}
  public Units() {}
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
  public Double getConversion_factor() {
	return conversion_factor;
  }
  public void setConversion_factor(Double conversion_factor) {
	this.conversion_factor = conversion_factor;
  }
  private int id;
  private String name;
  private Double conversion_factor;
}
