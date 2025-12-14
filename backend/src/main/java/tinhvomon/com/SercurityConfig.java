package tinhvomon.com;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
@Configuration
@EnableWebSecurity
public class SercurityConfig  {

    private final ThoaiProSpringApplication thoaiProSpringApplication;
  
	@Autowired
	private UserDetailsService userDetailsService;
	@Autowired
	private HeaderLoggingFilter headerLoggingFilter;

    SercurityConfig(ThoaiProSpringApplication thoaiProSpringApplication) {
        this.thoaiProSpringApplication = thoaiProSpringApplication;
    }
	
    @Bean
	public SecurityFilterChain sercurityFilterChain  (HttpSecurity http) throws Exception{
	return	http.csrf(customizer-> customizer.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))  
			 .httpBasic(h -> h.disable())
	            .formLogin(f -> f.disable())
    .addFilterBefore(headerLoggingFilter, 
            org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class)
    .authorizeHttpRequests(auth -> auth
    		.requestMatchers("/auth/login", "/public/**","/auth/register","/auth/verifytoken","/upload/**","/payment/vnpay_return","/test/**","/hello").permitAll() 
    		.anyRequest().authenticated()
    		)     
	    

		.authenticationProvider(authenticationProvider()).
		build();
	
	}

	
//	@Bean 
//  public	UserDetailsService userDetailsService() {
//		UserDetails user1 = User.withDefaultPasswordEncoder().username("vothoai1503@gmail.com").password("1234").roles("USER").build();
//		UserDetails user2 = User.withDefaultPasswordEncoder().username("BruceLee").password("1234").roles("ADMIN").build();
//		return new InMemoryUserDetailsManager(user1,user2);
//	}
	
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Allow specific origins (replace with your frontend URLs)
        configuration.setAllowedOrigins(Arrays.asList(
            "http://localhost:3000",
            "http://localhost:3001",
            "http://localhost:4200",
            "http://localhost:8080",
            "http://127.0.0.1:3000",
            "http://103.90.225.130:3000"
        ));
        
        // Or allow all origins (not recommended for production)
        // configuration.addAllowedOriginPattern("*");
        
        // Allow specific HTTP methods
        configuration.setAllowedMethods(Arrays.asList(
            "GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"
        ));
        
        // Allow all headers
        configuration.setAllowedHeaders(Arrays.asList("*"));
        
        // Allow credentials (cookies, authorization headers)
        configuration.setAllowCredentials(true);
        
        // How long the browser should cache CORS preflight responses
        configuration.setMaxAge(3600L);
        
        // Expose specific headers to the client
        configuration.setExposedHeaders(Arrays.asList(
            "Authorization", "Content-Type"
        ));
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
	
	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider provider =new DaoAuthenticationProvider();
		provider.setPasswordEncoder(NoOpPasswordEncoder.getInstance());
		provider.setUserDetailsService(userDetailsService);
		return provider;
	}
	 

	
}
