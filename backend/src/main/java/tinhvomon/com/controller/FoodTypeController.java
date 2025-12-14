package tinhvomon.com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tinhvomon.com.config.VnPayConfig;
import tinhvomon.com.models.FoodType;
import tinhvomon.com.models.User;
import tinhvomon.com.repository.FoodTypeRepository;

@RestController
@RequestMapping("/foodtype")
public class FoodTypeController {
	private final FoodTypeRepository foodTypeRepository;
	

	@Autowired
	private VnPayConfig vnPayConfig;
	@Autowired
	public FoodTypeController (FoodTypeRepository foodTypeRepository) {
		this.foodTypeRepository =foodTypeRepository;
	}
	@PostMapping("")
	public ResponseEntity<?> create (@RequestBody FoodType foodType) {
	
		var result = foodTypeRepository.create(foodType);
System.out.println("Result: "+ result);
		
		   return ResponseEntity.ok(foodType); 
	}
	
	@GetMapping("")
	public ResponseEntity<?> getAllFood () {
	
		var result = foodTypeRepository.getAll();
System.out.println("Result: "+ result);
		
		   return ResponseEntity.ok(result); 
	}

}
