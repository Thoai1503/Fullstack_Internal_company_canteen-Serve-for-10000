package tinhvomon.com.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tinhvomon.com.models.CartItem;
import tinhvomon.com.repository.CartItemRepository;

@RestController
@RequestMapping("/cartitem")
public class CartItemController {
 private final CartItemRepository cartItemRepository;
 
 public CartItemController (CartItemRepository cartItemRepository) {
	 this.cartItemRepository = cartItemRepository;
 }
 
 @GetMapping("/user/{user_id}")
 public ResponseEntity getByUserId (@PathVariable int user_id) {
	 var list = cartItemRepository.FindByUserId(user_id);
	 System.out.println(list);
	 return ResponseEntity.ok(list);
 }
 @PostMapping("/{id}")
 public ResponseEntity updateQuantity(@RequestBody CartItem ci) {
	 var en  =cartItemRepository.update(ci);
	 return ResponseEntity.ok(en);
	 
 }
 
}
