package tinhvomon.com.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/order-status-history")
public class OrderHistoryController {
		private final tinhvomon.com.repository.OrderStatusHistoryRepository orderStatusHistoryRepository;

	public OrderHistoryController(tinhvomon.com.repository.OrderStatusHistoryRepository orderStatusHistoryRepository) {
		this.orderStatusHistoryRepository = orderStatusHistoryRepository;
	}
	
	@GetMapping("order/{order_id}")
	public ResponseEntity getOrderStatusHistoryByOrderId (@PathVariable int order_id) {
		var histories = orderStatusHistoryRepository.getAllListByOrderId(order_id);
		return ResponseEntity.ok(histories);
	}
     
}
