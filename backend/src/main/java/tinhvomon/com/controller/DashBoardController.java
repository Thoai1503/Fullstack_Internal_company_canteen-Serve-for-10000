package tinhvomon.com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import tinhvomon.com.models.DashBoardInfo;
import tinhvomon.com.models.Order;
import tinhvomon.com.repository.OrderRepository;

@RestController
@RequestMapping("/dashboard")
public class DashBoardController {
	
	private final OrderRepository orderRepository;
	
	@Autowired
	public DashBoardController( OrderRepository orderRepository) {
	  this.orderRepository= orderRepository;	
	}
	
   @GetMapping("")
   public ResponseEntity dashBoard () {
	   	
	   var orders =  orderRepository.getAllForDashBoard();
	   var completedOrders = orderRepository.getCompletedAllForDashBoard();
	   var cancelOrders = orderRepository.getCancelledAllForDashBoard();
	   var result = orderRepository.getRevenueStatistics();
	   var foodTypeStatistics = orderRepository.getRevenueByFoodType();
	   
	   var totalAmount =0;
	  
	   
	   for (Order item: completedOrders) {
		   totalAmount+= item.getTotal_amount();
	   }
	   
	   
	   
	   System.out.println("Total: "+totalAmount);
	   DashBoardInfo dashBoardInfo =new DashBoardInfo();
	   dashBoardInfo.setTotal_count(orders.size());
	   dashBoardInfo.setOrders(orders);
	   dashBoardInfo.setCompleted_count(completedOrders.size());
	   dashBoardInfo.setTotal(totalAmount);
	   dashBoardInfo.setCancel_count(cancelOrders.size());
	   dashBoardInfo.setStatistics(result);
	   dashBoardInfo.setStatisticByFoodType(foodTypeStatistics);
	   
	   //lấy thông tin doanh thu theo tháng
	   
	    return ResponseEntity.ok(dashBoardInfo);
	   
   }
   
   @GetMapping("/test")
   public ResponseEntity test ( HttpServletRequest request) throws Exception {
	   
	   var result = orderRepository.getRevenueStatistics();
   	
   	
		   return ResponseEntity.ok(result);
   }
}
