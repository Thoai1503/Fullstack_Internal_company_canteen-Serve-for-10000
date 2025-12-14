package tinhvomon.com.service.payment;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;
import com.google.gson.JsonObject;

import jakarta.servlet.http.HttpServletRequest;

import com.google.gson.Gson;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import tinhvomon.com.config.VnPayConfig;
import tinhvomon.com.models.VnPayPayload;


@Component
public class VNPay {

	@Autowired
	private VnPayConfig vnPayConfig;
	
	public String createPayment(HttpServletRequest req) throws UnsupportedEncodingException {
		 String vnp_Version = "2.1.0";
         String vnp_Command = "pay";
         String vnp_OrderInfo = req.getParameter("orderInfo");
         String orderType = req.getParameter("ordertype");
         String vnp_TxnRef = vnPayConfig.getRandomNumber(8);
         String vnp_IpAddr = vnPayConfig.getIpAddress(req);
         String vnp_TmnCode = vnPayConfig.getTmnCode();
 
         int amount = Integer.parseInt(req.getParameter("amount")) * 100;
         Map vnp_Params = new HashMap<>();
         vnp_Params.put("vnp_Version", vnp_Version); //Phiên bản cũ là 2.0.0, 2.0.1 thay đổi sang 2.1.0
         vnp_Params.put("vnp_Command", vnp_Command);
         vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
         vnp_Params.put("vnp_Amount", String.valueOf(amount));
         vnp_Params.put("vnp_CurrCode", "VND");
         String bank_code = req.getParameter("bankcode");
         if (bank_code != null && !bank_code.isEmpty()) {
             vnp_Params.put("vnp_BankCode", bank_code);
         }
         vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
         vnp_Params.put("vnp_OrderInfo", vnp_OrderInfo);
         vnp_Params.put("vnp_OrderType", orderType);
 
         String locate = req.getParameter("language");
         if (locate != null && !locate.isEmpty()) {
             vnp_Params.put("vnp_Locale", locate);
         } else {
             vnp_Params.put("vnp_Locale", "vn");
         }
         vnp_Params.put("vnp_ReturnUrl", vnPayConfig.getReturnUrl());
         vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
         Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
 
         SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
         String vnp_CreateDate = formatter.format(cld.getTime());
 
         vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

         //Build data to hash and querystring
         List fieldNames = new ArrayList(vnp_Params.keySet());
         Collections.sort(fieldNames);
         StringBuilder hashData = new StringBuilder();
         StringBuilder query = new StringBuilder();
         Iterator itr = fieldNames.iterator();
         
           
         while (itr.hasNext()) {
             String fieldName = (String) itr.next();
             String fieldValue = (String) vnp_Params.get(fieldName);
             if ((fieldValue != null) && (fieldValue.length() > 0)) {
                 //Build hash data
                 hashData.append(fieldName);
                 hashData.append('=');
                 hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                 //Build query
                 query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                 query.append('=');
                 query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                 if (itr.hasNext()) {
                     query.append('&');
                     hashData.append('&');
                 }
             }
         }
         String queryUrl = query.toString();
         

         
         String vnp_SecureHash = vnPayConfig.hmacSHA512(vnPayConfig.getHashSecret(), hashData.toString());
         queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;

         
             
         

         String paymentUrl = vnPayConfig.getPayUrl() + "?" + queryUrl;
//         com.google.gson.JsonObject job = new JsonObject();
//         job.addProperty("code", "00");
//         job.addProperty("message", "success");
//         job.addProperty("data", paymentUrl);
//         Gson gson = new Gson();
        // resp.getWriter().write(gson.toJson(job));
         return paymentUrl;
	}
}
