package tinhvomon.com;

import java.io.IOException;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import tinhvomon.com.repository.UserRepo;
import tinhvomon.com.service.JWTSercurity;

@Component
public class HeaderLoggingFilter extends OncePerRequestFilter {
	  @Autowired
	    private UserDetailsService userDetailsService;

	  @Autowired
	  private JWTSercurity jwtSercurity;
	  
	  @Autowired
	  private UserRepo userRepo;
	  
	  
    @Override
    protected void  doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String requestURI = request.getRequestURI();
        System.out.println(requestURI);

        // ⭐ QUAN TRỌNG: Bỏ qua OPTIONS request (CORS preflight)


    	
        String userAgent = request.getHeader("User-Agent");
        String authorization = request.getHeader("Authorization");
        System.out.println("=== HEADER INFO ===");

        
        
        if (authorization != null ) {
        	  String username = null;
        	if(authorization.startsWith("Basic ")) {
            String base64Credentials = authorization.substring(6);
            String decoded = new String(Base64.getDecoder().decode(base64Credentials));

            String[] parts = decoded.split(":", 2);
             username = parts[0];
            String password = parts[1];

            System.out.println("Basic Auth Username = " + username);
            System.out.println("Basic Auth Password = " + password);
            
            boolean isAutheticated = userRepo.checkBasicAuth(username, password);
            System.out.println("Authenticated basic = " + isAutheticated);
            
            if(!isAutheticated) {
                       response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                   response.getWriter().write("Authorization Basic auth");
                   ResponseEntity.status(401);
            	return; }
           
            //set chi tiết thông tin user ngay tại đây
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            
            
   
            // Quan trọng
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(userDetails, password,   userDetails.getAuthorities());
                 authentication.setDetails(userDetails);
            // Lưu vào SecurityContext
            SecurityContextHolder.getContext().setAuthentication(authentication);
        
            }
        	 if(authorization.startsWith("Bearer ")) {

             	
           	  String token = authorization.substring(7);
           	  username = jwtSercurity.extractUsername(token);
                
           	  
           	  if(username ==null) {
                  ResponseEntity.status(401).body("Unauthorized user");
           	  }
                 

               if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            	   System.out.println("User verified:" +username);
                   UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                   if (jwtSercurity.validateToken(token, userDetails)) {
                       UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                               userDetails,
                               null,
                               userDetails.getAuthorities());
                       authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                       SecurityContextHolder.getContext().setAuthentication(authToken);
                   }
                   else {
                	   ResponseEntity.status(401).body("Token expire");
                   }
               
               }
      
                 
           
              
           }
        	
        }


     
        System.out.println("User-Agent: " + userAgent);
        System.out.println("Authorization: " + authorization);

        filterChain.doFilter(request, response);
    }
}