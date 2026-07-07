package tinhvomon.com.models;

import java.time.LocalDateTime;

public class InventoryAudit {
   public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getIngredient_id() {
		return ingredient_id;
	}
	public void setIngredient_id(Integer ingredient_id) {
		this.ingredient_id = ingredient_id;
	}
	public Integer getSource_id() {
		return source_id;
	}
	public void setSource_id(Integer source_id) {
		this.source_id = source_id;
	}
	public Integer getSource_type() {
		return source_type;
	}
	public void setSource_type(Integer source_type) {
		this.source_type = source_type;
	}
	public Double getStock_adjust() {
		return stock_adjust;
	}
	public void setStock_adjust(Double stock_adjust) {
		this.stock_adjust = stock_adjust;
	}
	public Long getUnit_price() {
		return unit_price;
	}
	public void setUnit_price(Long unit_price) {
		this.unit_price = unit_price;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public LocalDateTime getCreated_at() {
		return created_at;
	}
	public void setCreated_at(LocalDateTime created_at) {
		this.created_at = created_at;
	}
   private Integer id;
   private Integer ingredient_id;
   private Integer source_id;
   private Integer source_type;
   private Double stock_adjust;
   public Double getOld_stock() {
	return old_stock;
}
   public void setOld_stock(Double old_stock) {
	this.old_stock = old_stock;
   }
   public Double getNew_stock() {
	return new_stock;
   }
   public void setNew_stock(Double new_stock) {
	this.new_stock = new_stock;
   }
   public Integer getAdjust_type() {
	return adjust_type;
}
   public void setAdjust_type(Integer adjust_type) {
	this.adjust_type = adjust_type;
   }
   private Integer adjust_type;
   private Double old_stock;
   private Double new_stock;
   private Long unit_price;
   private String note;
   private LocalDateTime created_at;
}
