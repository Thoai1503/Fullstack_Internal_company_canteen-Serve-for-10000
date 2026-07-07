package tinhvomon.com.controller;

import java.awt.print.Pageable;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import tinhvomon.com.models.InventoryAudit;
import tinhvomon.com.service.bussiness.InventoryAuditService;

@RestController
@RequestMapping("/inventory-audit")
public class InventoryAuditController {
    @Autowired
    private InventoryAuditService inventoryAuditService;
	
    @GetMapping("")
    public ResponseEntity<List<InventoryAudit>> getAll(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size,
    		   @RequestParam(defaultValue = "0") int ingredientId,
    		   @RequestParam(required = false) Integer transaction_type,
    		   @RequestParam(required = false) Integer source_type,
    		   @RequestParam(defaultValue = "created_at") String sortBy, @RequestParam(defaultValue = "desc") String sortDir,
    		   @RequestParam(required = false) String startDate, @RequestParam(required = false) String endDate
    		   
    		) {
    	System.out.println("ingredientId: " + ingredientId);
    	System.out.println("transaction_type: " + transaction_type);
    	System.out.println("sortBy: " + sortBy);
    	System.out.println("sortDir: " + sortDir);
    	System.out.println("startDate: " + startDate);
    
		return ResponseEntity.ok(inventoryAuditService.getAll(page, size, ingredientId, transaction_type, source_type, sortBy, sortDir, startDate, endDate));
	}
}
