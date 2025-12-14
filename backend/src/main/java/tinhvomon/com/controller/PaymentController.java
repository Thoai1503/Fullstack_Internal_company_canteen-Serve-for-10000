package tinhvomon.com.controller;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import jakarta.servlet.http.HttpServletRequest;
import tinhvomon.com.models.CancellationRequest;
import tinhvomon.com.models.Cart;
import tinhvomon.com.models.CartItem;
import tinhvomon.com.models.FoodType;
import tinhvomon.com.models.Order;
import tinhvomon.com.models.OrderItems;
import tinhvomon.com.models.OrderStatusHistory;
import tinhvomon.com.models.VnPayPayload;
import tinhvomon.com.repository.CartItemRepository;
import tinhvomon.com.repository.CartRepository;
import tinhvomon.com.repository.IngredientInventoryRepository;
import tinhvomon.com.repository.OrderItemRepository;
import tinhvomon.com.repository.OrderRepository;
import tinhvomon.com.repository.OrderStatusHistoryRepository;
import tinhvomon.com.service.payment.VNPay;

@RestController
@RequestMapping("/payment")
public class PaymentController {
	
	
	private final CartRepository cartRepository;
	
	private final CartItemRepository cartItemRepository;
	private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final OrderStatusHistoryRepository orderStatusHistoryRepository;
    private final IngredientInventoryRepository ingredientInventoryRepository;
	
	@Autowired
	public PaymentController(CartRepository cartRepository,CartItemRepository cartItemRepository,OrderRepository orderRepository,OrderItemRepository orderItemRepository ,OrderStatusHistoryRepository orderStatusHistoryRepository,IngredientInventoryRepository ingredientInventoryRepository) {
		this.cartItemRepository =cartItemRepository;
		this.cartRepository= cartRepository;
		this.orderRepository = orderRepository;
		this.orderItemRepository = orderItemRepository;
		this.orderStatusHistoryRepository = orderStatusHistoryRepository;
		this.ingredientInventoryRepository = ingredientInventoryRepository;
	} 
	@Autowired
	private VNPay vnPay ;
    @PostMapping("")
    public ResponseEntity<?> create ( HttpServletRequest request,@RequestBody VnPayPayload vnPayPayload) throws Exception {
       		String url = vnPay.createPayment(request);
		Order o = new Order();
		var user_id =Integer.valueOf( request.getParameter("orderInfo"));
		o.setUser_id(user_id );
		o.setTotal_amount(Double.valueOf(request.getParameter("amount")));
		o.setStatus(1);
		HashSet<CartItem> list =  cartItemRepository.FindByUserId(user_id);
		//check lượng tồn kho
		if(// nếu mảng > 0 -> tồn tại sản phẩm hết hàng	
			ingredientInventoryRepository.CheckingStock(list).size()>0
		  ) {
			return ResponseEntity.ok("Hết hàng");
			}
		
		
		
		
		//nếu tất cả đủ hàng thì tạo order
		Order order = orderRepository.create(o);
		
		
		
		
		
		
		
		//tạo chi tiết đơn hàng
		for(CartItem item:list) {
			OrderItems i =new OrderItems();
			i.setFood_id(item.getFood_id());
			i.setOrder_id(order.getId());
			i.setQuantity(item.getQuantity());
			i.setTotal_price(item.getFood().getPrice()*item.getQuantity());
			i.setUnit_price(item.getFood().getPrice());
			var re = orderItemRepository.create(i);
		}

    	System.out.println("Date: "+ request.getParameter("orderInfo"));
System.out.println("Request: "+ request.getRemoteAddr());
		
		   return ResponseEntity.ok(url); 
	}
    @GetMapping("/vnpay_return")
    public RedirectView returnVnPay ( HttpServletRequest request) throws Exception {
    	
        OrderStatusHistory osh = new OrderStatusHistory();
    	 Map<String, String[]> paramMap = request.getParameterMap();
    	  
    	    Map<String, String> fields = new HashMap();
    	    

    	    for (Map.Entry<String, String[]> entry : paramMap.entrySet()) {
    	        fields.put(entry.getKey(), entry.getValue()[0]);
    	    }

//         Map<String, String> parsedMap = paramMap.entrySet().stream()
//                 .collect(Collectors.toMap(
//                         Map.Entry::getKey,
//                         e -> String.join(",", e.getValue())  
//                 ));
         
           var user_id=  Integer.valueOf( fields.get("vnp_OrderInfo"));
           var responseCode = String.valueOf(fields.get("vnp_ResponseCode"));
           System.out.println( "Payment info: " + user_id);
           Cart cart=  cartRepository.FindbyUserId(user_id);
           System.out.println( "Cart: " + cart);
           
           
           
           if(responseCode.equals("00")) {
        	   Order pendingOrder = orderRepository.FindPendingByUserId(user_id);
        	   pendingOrder.setStatus(2);	
        	   var cancellationRequest = new CancellationRequest();
        	   cancellationRequest.setCancellation_status(0);
        	   pendingOrder.setCancellation_status(cancellationRequest);
        	  Order  order = orderRepository.update(pendingOrder);
        	   var dCartItemsRe= cartItemRepository.delete(cart.getId());
        	   
        	   System.out.println( "Re: " + dCartItemsRe);
        	   
        	   osh.setOrder_id(pendingOrder.getId());
        	   osh.setOld_status(1);
        	   osh.setNew_status(2);
        	   osh.setChanged_by(user_id);
        	   osh.setChanged_by_role("user");
        	   osh.setNote("Đơn hàng đã được thanh toán thành công");
        	   var re= orderStatusHistoryRepository.create(osh);
        	   
        	   System.out.println("OrderStatusHistory Re: " + re.getId());
        	   
        	     return new RedirectView("http://localhost:3000/success");
           }
           
           
    	   Order pendingOrder = orderRepository.FindPendingByUserId(user_id);
    	   pendingOrder.setStatus(3);
    	   var cancellationRequest = new CancellationRequest();
    	   cancellationRequest.setCancellation_status(4);
    	   pendingOrder.setCancellation_status(cancellationRequest);
     	  Order  order = orderRepository.update(pendingOrder);
   	   var dCartItemsRe= cartItemRepository.delete(cart.getId());
   	   
   	      osh.setOrder_id(pendingOrder.getId());
   	      osh.setOld_status(1);
   	      osh.setNew_status(3);
   	      osh.setChanged_by(user_id);
   	      osh.setChanged_by_role("user");
   	      osh.setNote("Thanh toán thất bại hoặc hủy thanh toán");
   	   var re= orderStatusHistoryRepository.create(osh);
	   
//         parsedMap.forEach((key, value) -> System.out.println(key + " = " + value));
//
// 
//          parsedMap.forEach((key, value) -> System.out.println(key + " = " + value));

           return new RedirectView("http://localhost:3000/fail");
	}
    
 

}