package tinhvomon.com.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import tinhvomon.com.repository.ProductRepository;

@Controller
@RequestMapping("/home")
public class HomeController {
	@GetMapping("/")
	   public String index(Model model) {
         var list = ProductRepository.Instance().GetAll();
		model.addAttribute("products",list);
		   return "index";
	   }
}
