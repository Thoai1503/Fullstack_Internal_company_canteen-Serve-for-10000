package tinhvomon.com.controller;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tinhvomon.com.models.CancellationRequest;
import tinhvomon.com.repository.ConfigRepository;
import tinhvomon.com.repository.OrderRepository;

@RestController
@RequestMapping("/cancellation_request")
public class CancellationRequestController {
	private final OrderRepository orderRepository;
	private final ConfigRepository configRepository;
	
	
	
	@Autowired
	public CancellationRequestController (OrderRepository orderRepository, ConfigRepository configRepository) {
		this.orderRepository= orderRepository;
		this.configRepository= configRepository;
	}
    @PostMapping("/send/{order_id}/user/{user_id}")
    public ResponseEntity sendCancel (@PathVariable int order_id,@PathVariable int user_id,@RequestBody CancellationRequest cancellationRequest) {
    	var time = configRepository.getConfigValue("PREPARE_TIME").getValue().trim();
    	System.out.println("Prepare time: "+ time);
    	
    	LocalTime now = LocalTime.now();
    	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
        LocalTime nowParsed = LocalTime.parse(now.format(formatter), formatter);
        System.out.println("Current time: "+ nowParsed);
        
        var result = time.compareTo(nowParsed.toString());

        if (result <= 0) {
			System.out.println("Current time is after or equal to prepare time.");
			return ResponseEntity.ok(false);
		} else {
			System.out.println("Current time is before prepare time.");
		}
        
    	LocalTime timeParse = LocalTime.parse(time, DateTimeFormatter.ofPattern("HH:mm:ss"));
    	System.out.println("Current time: "+ timeParse);
    	//return ResponseEntity.ok(null);
    	System.out.println("Reason: "+ cancellationRequest.getCancellation_request_reason());
    	var procedureRespone= orderRepository.RequestOrderCancellation(order_id,user_id, cancellationRequest.getCancellation_request_reason());
    	if(procedureRespone.getCode()!=1) {
			return ResponseEntity.ok(false);
		}
//    	cancellationRequest.setCancellation_request_date(LocalDateTime.now());
//    	cancellationRequest.setCancellation_status(1);//Chờ duyệt yêu cầu huỷ
//    	
//    	var re = orderRepository.updateCancellationRequest(cancellationRequest, order_id);
//    	
    	return ResponseEntity.ok(true);
    }
    @PostMapping("/processed/{order_id}")
    public ResponseEntity adminConfirmCancelltion (@PathVariable int order_id,@RequestBody CancellationRequest cancellationRequest) {
    	System.out.println("Reason: "+ cancellationRequest.getCancellation_request_reason());
    	
    	var cancellationStatus= cancellationRequest.getCancellation_status();
    	var admin_note =cancellationRequest.getCancellation_admin_note();
   	cancellationRequest.setCancellation_processed_date(LocalDateTime.now());
    	switch (cancellationStatus) {
        case 3:  //Từ chối huỷ
       //  cancellationRequest.setStatus(2);
        	var result = orderRepository.ProcessOrderCancellation(order_id, cancellationRequest.getCancellation_processed_by(), 0, admin_note);
        	System.out.println("Result code: "+ result.getCode());
        	if(result.getCode()!=1) {
        		return ResponseEntity.ok(false);
        	}
        	return ResponseEntity.ok(true);
         
        case 2: // Duyệt huỷ

			var res = orderRepository.ProcessOrderCancellation( order_id, cancellationRequest.getCancellation_processed_by(), 1, admin_note);
			System.out.println("Result code: "+ res.getCode());
			if(res.getCode()!=1) {
			return ResponseEntity.ok(false);
			}
			return ResponseEntity.ok(true);
        default:
            // code nếu không khớp case nào
        	return ResponseEntity.ok(false);
    	}
//    	cancellationRequest.setCancellation_admin_note((admin_note!=null&& admin_note!="")?admin_note:null);
//        cancellationRequest.setCancellation_processed_date(LocalDateTime.now());
  
    
    	
    	//var re = orderRepository.updateCancellationProcess(cancellationRequest, order_id);
    	
   
    }
    
}
