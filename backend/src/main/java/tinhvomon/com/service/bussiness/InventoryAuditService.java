package tinhvomon.com.service.bussiness;


import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import tinhvomon.com.models.InventoryAudit;
import tinhvomon.com.repository.InventoryAuditRepository;

@Service
public class InventoryAuditService {
    @Autowired
	private InventoryAuditRepository inventoryAuditRepository;
	
	public InventoryAuditRepository getInventoryAuditRepository() {
		return inventoryAuditRepository;
	}
	
	@Async
	public void create(InventoryAudit e)  {
		try {
			 inventoryAuditRepository.create(e);
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		
		}
	}
	
	public List<InventoryAudit> getAll(
			Integer page, Integer size, Integer ingredientId, Integer transactionType,Integer sourceType, String sortBy, String sortDir, String startDate, String endDate
			
			 
			) {
		
		
		
		return inventoryAuditRepository.getAllWithParams( 
				 page, size, ingredientId, transactionType, sourceType, sortBy, sortDir, startDate, endDate
				).stream().sorted((a,b)->b.getCreated_at().compareTo(a.getCreated_at())).toList();
	}
	
}
