package tinhvomon.com.service.bussiness;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import tinhvomon.com.models.InventoryAudit;
import tinhvomon.com.repository.IngredientInventoryRepository;
import tinhvomon.com.repository.InventoryAuditRepository;

@Service
public class InventoryAndAuditService {
       @Autowired
       private IngredientInventoryRepository ingredientInventoryRepository;

       @Autowired
       private InventoryAuditRepository inventoryAuditRepository;
       
       @Async
       @Transactional
       public void updateStockAndAudit(int ingredientId, Double deltaAmonut, int sourceId, int sourceType, int adjustType, Double stockAdjust, Long unitPrice, String note) throws Exception {
		   // Get the old stock value
		   Double oldStock = ingredientInventoryRepository.getStockByIngredientId(ingredientId);
		   
		   // Update the stock in IngredientInventory
		   Double updatedStock = ingredientInventoryRepository.updateStock(ingredientId, oldStock - deltaAmonut);
		   
		   // Create a new InventoryAudit record
		   InventoryAudit audit = new InventoryAudit();
		   audit.setIngredient_id(ingredientId);
		   audit.setSource_id(sourceId);
		   audit.setSource_type(sourceType);
		   audit.setAdjust_type(adjustType);
		   audit.setStock_adjust(stockAdjust);
		   audit.setOld_stock(oldStock);
		   audit.setNew_stock(updatedStock);
		   audit.setUnit_price(unitPrice);
		   audit.setNote(note);
		   
		   inventoryAuditRepository.create(audit);
		   
		 //  return updatedStock;
	   }
}
