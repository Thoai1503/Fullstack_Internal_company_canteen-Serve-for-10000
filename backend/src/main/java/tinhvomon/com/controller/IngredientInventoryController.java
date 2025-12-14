package tinhvomon.com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tinhvomon.com.models.IngredientInventory;
import tinhvomon.com.repository.IngredientInventoryRepository;

@RestController
@RequestMapping("/inventory")
public class IngredientInventoryController {
	
	@Autowired
	private final IngredientInventoryRepository ingredientInventoryRepository;
	
	public IngredientInventoryController (IngredientInventoryRepository ingredientInventoryRepository) {
		this.ingredientInventoryRepository = ingredientInventoryRepository;
	}
	

	@GetMapping("")
	public ResponseEntity getAll() {
		var list = ingredientInventoryRepository.getAllList();
		return ResponseEntity.ok(list);
	}
	@PostMapping("stock-update/{id}")
	public ResponseEntity updateStock (@PathVariable int id,@RequestBody IngredientInventory in) {
		return ResponseEntity.ok(ingredientInventoryRepository.updateStock(id, in.getStock()));
	}
}
