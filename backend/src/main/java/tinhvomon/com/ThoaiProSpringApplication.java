 package tinhvomon.com;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication


@RestController
public class ThoaiProSpringApplication {
	
    @RequestMapping("/hello")
    public String home() {
            return "Hello World!";
    }
	

	public static void main(String[] args) {
		SpringApplication.run(ThoaiProSpringApplication.class, args);
	}

}
