package tinhvomon.com.controller;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import tinhvomon.com.repository.ConfigRepository;

@RestController
@RequestMapping("/config")
public class ConfigController {

	private final ConfigRepository configRepository;
	
	public ConfigController(ConfigRepository configRepository) {
		this.configRepository = configRepository;
	}
	
	@RequestMapping("/get")
	public String getConfigValue(@RequestParam String key) {
		
		var config = configRepository.getConfigValue(key);
		if(config.getType().equals("time")) {
			System.out.println("Parsing time value: "+ config.getValue());
			LocalTime timeValue = LocalTime.parse(config.getValue(),DateTimeFormatter.ofPattern("HH:mm:ss"));
			return timeValue.toString();
		}
		
		return config.getValue().toString().trim();
	}
	
}
