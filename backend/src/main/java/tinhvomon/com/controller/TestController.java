package tinhvomon.com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tinhvomon.com.service.TestSingleton;

@RestController
@RequestMapping("/test")
public class TestController {

@Autowired
  private final TestSingleton testSingleton;
 
 public TestController(TestSingleton testSingleton) {
	 this.testSingleton = testSingleton;
	 
 }
  @GetMapping("/singleton")
  public String testSingleton() {
	  testSingleton.incrementCounter();
	  System.out.println("Counter value: " + testSingleton.getCounter());
	  return "Counter value: " + testSingleton.getCounter();
  }
}
