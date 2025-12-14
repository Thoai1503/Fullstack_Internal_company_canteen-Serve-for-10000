package tinhvomon.com.controller;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import tinhvomon.com.repository.OrderRepository;

@RestController
@RequestMapping("/order")
public class OrderController {
    private final OrderRepository orderRepository;
    
    @Autowired
    public OrderController (OrderRepository orderRepository) {
    	this.orderRepository=orderRepository;
    }
    @GetMapping("/user/{user_id}")
    public ResponseEntity findByUserId (@PathVariable int user_id) {
    	var list = orderRepository.FindByUserIdList(user_id);
    	return ResponseEntity.ok(list);
    }
    @GetMapping("")
    public ResponseEntity findAll(    
    		@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start_date,
    	    @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end_date,
    	    @RequestParam(required = false) Double min_amount,
    	    @RequestParam(required = false) Double max_amount,
    	    @RequestParam(defaultValue = "date") String sort_by,
    	    @RequestParam(defaultValue = "desc") String sort_order,
    	    @RequestParam(defaultValue = "all") String status) {
    	
    	System.out.println("start_date: " + start_date);
    	System.out.println("end_date: " + end_date);
    	System.out.println("min_amount: " + min_amount);
    	System.out.println("max_amount: " + max_amount);
    	System.out.println("sort_by: " + sort_by);
    	System.out.println("sort_order: " + sort_order);
    	System.out.println("status: " + status);
    	
    	
    	var listWithParam = orderRepository.findAllList(start_date, end_date, min_amount, max_amount, sort_by, sort_order, status);
    	System.out.println("List with params size: " + listWithParam.size());
    	var list = orderRepository.getAllList().toArray();
    	return ResponseEntity.ok(listWithParam);
    }
    
}
