package tinhvomon.com.service.bussiness;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import tinhvomon.com.models.OrderItems;
import tinhvomon.com.repository.OrderItemRepository;

@Service
public class OrderItemService {
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Async
    public void createOrderItem(OrderItems orderItem) throws Exception {
	 orderItemRepository.create(orderItem);
	}
}
