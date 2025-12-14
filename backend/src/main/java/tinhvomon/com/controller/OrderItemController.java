package tinhvomon.com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tinhvomon.com.repository.OrderItemRepository;

@RestController
@RequestMapping("/orderitem")
public class OrderItemController {
	private final OrderItemRepository orderItemRepository;
	
	@Autowired
	public OrderItemController(OrderItemRepository orderItemRepository) {
		this.orderItemRepository =orderItemRepository;
	}

	@GetMapping("/order/{order_id}")
	public ResponseEntity  FindByOrderId (@PathVariable int order_id,Authentication authentication) {
	var user=	authentication.getName().toString();
	System.out.println("User: "+user);
		var list = orderItemRepository.FindByOrderId(order_id);
		
		  return ResponseEntity.ok(list);
	}
	
}
