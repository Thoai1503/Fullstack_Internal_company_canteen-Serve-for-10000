package tinhvomon.com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tinhvomon.com.models.Cart;
import tinhvomon.com.models.CartItem;
import tinhvomon.com.models.FoodItem;
import tinhvomon.com.repository.CartItemRepository;
import tinhvomon.com.repository.CartRepository;

@RestController
@RequestMapping("/cart")
public class CartController {
	
	private final CartRepository cartRepository;
	
	private final CartItemRepository cartItemRepository;
	
	
	@Autowired
	public CartController (CartRepository cartRepository,CartItemRepository cartItemRepository) {
		this.cartRepository= cartRepository;
		this.cartItemRepository= cartItemRepository;
	}
	 
	@PostMapping("/{user_id}/food/{food_id}")
	public ResponseEntity createCart (@PathVariable int user_id,@PathVariable int food_id) throws Exception {
		System.out.println("Food: "+food_id);
		var cart = cartRepository.FindbyUserId(user_id);
		System.out.println("Cart: "+ cart);
		
		if(cart == null) {
			System.out.println("Not exist ");
			
		var en = new Cart();
		en.setUser_id(user_id);
		 cart = cartRepository.create(en);
		 var cartItem = new CartItem();
		 cartItem.setCart_id(cart.getId());
		 cartItem.setFood_id(food_id);
		 cartItem.setQuantity(1);
		 cartItem =  cartItemRepository.create(cartItem);
		return ResponseEntity.ok(cartItem);
		}
		
		
		
		System.out.println("Exist ");
		var en = new CartItem();
		en.setCart_id(cart.getId());
		en.setFood_id(food_id);
		en.setQuantity(1);
		System.out.println("Food C: "+en.getFood_id());
		
		
		
		
		
		
		return ResponseEntity.ok(  cartItemRepository.create(en));
	} 

}
