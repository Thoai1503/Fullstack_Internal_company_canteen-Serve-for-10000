package tinhvomon.com.utils;

import java.util.HashMap;
import java.util.Map;

import tinhvomon.com.models.User;

public class UserToUserResponse {

	
	public static  Map<String, Object> convert (User user,String token){
		 Map<String, Object> response = new HashMap<>();
		    response.put("user", Map.of(
		        "id", user.getId(),
		        "email", user.getEmail(),
		        "role",user.getRole()
		       
		    ));
		    response.put("token", token);
		    return response;
	}
}
