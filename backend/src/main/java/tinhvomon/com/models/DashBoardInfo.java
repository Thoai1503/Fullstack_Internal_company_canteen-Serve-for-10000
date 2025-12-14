package tinhvomon.com.models;

import java.util.List;
import java.util.Map;

public class DashBoardInfo {
   public DashBoardInfo(int total, List<Order> orders, int total_count, int cancel_count, int completed_count) {
		super();
		this.total = total;
		this.orders = orders;
		this.total_count = total_count;
		this.cancel_count = cancel_count;
		this.completed_count = completed_count;
	}
   
   public DashBoardInfo() {}
   public int getTotal() {
	return total;
}
   public void setTotal(int total) {
	this.total = total;
   }
   public List<Order> getOrders() {
	return orders;
   }
   public void setOrders(List<Order> orders) {
	this.orders = orders;
   }
   public int getTotal_count() {
	return total_count;
   }
   public void setTotal_count(int total_count) {
	this.total_count = total_count;
   }
   public int getCancel_count() {
	return cancel_count;
   }
   public void setCancel_count(int cancel_count) {
	this.cancel_count = cancel_count;
   }
   public int getCompleted_count() {
	return completed_count;
   }
   public void setCompleted_count(int completed_count) {
	this.completed_count = completed_count;
   }
   private int total;
   private List<Order> orders;
   private int total_count;
   private int cancel_count;
   private int completed_count;
   public Map<String, Integer> getStatistics() {
	return statistics;
}

   public void setStatistics(Map<String, Integer> statistics) {
	this.statistics = statistics;
   }
   private Map<String,Integer> statistics;
   public Map<String, Integer> getStatisticByFoodType() {
	return statisticByFoodType;
}

   public void setStatisticByFoodType(Map<String, Integer> statisticByFoodType) {
	this.statisticByFoodType = statisticByFoodType;
   }
   private Map<String, Integer> statisticByFoodType;
   
}
