package tinhvomon.com.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import tinhvomon.com.models.FoodItem;

import tinhvomon.com.repository.FoodItemRepository;


@RestController
@RequestMapping("/fooditem")
public class FoodItemController {
	private final FoodItemRepository foodItemRepository;

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/src/main/resources/static/upload/";; // Define your upload directory

    @PostMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity update(
            @PathVariable Long id,
            @RequestPart("item") FoodItem item,
            @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {  // ✅ Optional
        Path uploadPath = Paths.get(UPLOAD_DIR);
        System.out.println("ID: " + id);
        System.out.println(item.getImage());
        
        if (image != null && !image.isEmpty()) {
            System.out.println("Image: " + image.getOriginalFilename());
            String uniqueName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            Path filePath = uploadPath.resolve(uniqueName);
            Files.copy(image.getInputStream(), filePath);
            item.setImage(uniqueName);

        	var re = foodItemRepository.update(item);
            
            // Process image upload
            return ResponseEntity.ok(re);
            
        } else {
        	var re = foodItemRepository.update(item);
        	
            System.out.println("No image uploaded");
        }
        
        return ResponseEntity.ok(null);
    }
    @CrossOrigin(origins = "*")
	@PostMapping("/upload/{id}")
    public ResponseEntity uploadImage(@RequestParam("imageFile") MultipartFile imageFile,@PathVariable int id) throws Exception {
    	System.out.println(System.getProperty("user.dir"));
        Path uploadPath = Paths.get(UPLOAD_DIR);

    	if (!imageFile.isEmpty()) {
       
        	System.out.print("Upload url: "+ uploadPath);
            if (!Files.exists(uploadPath)) {
            	
            	System.out.print("Upload");
            	
                Files.createDirectories(uploadPath);
            }
            String uniqueName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
        	System.out.print("Name: "+ uniqueName);
            // Save the file to the specified directory
            Path filePath = uploadPath.resolve(uniqueName);
            System.out.println("Upload to: " + uploadPath.toAbsolutePath());
            System.out.println("Saved file: " + filePath.toAbsolutePath());
            Files.copy(imageFile.getInputStream(), filePath);
            var re = foodItemRepository.uploadImage(uniqueName, id);
          	System.out.print("Uploaded: "+ re);
      
            return ResponseEntity.ok(true); // Redirect to a success page or return a message
        }
        return ResponseEntity.ok(false); // Handle empty file or other errors
    }

	@Autowired
	public FoodItemController (FoodItemRepository foodTypeRepository) {
		this.foodItemRepository =foodTypeRepository;
	}
	@GetMapping("")
	public ResponseEntity<?> getAll(){
		
		var result =foodItemRepository.getAll();
		
		   return ResponseEntity.ok(result); 
	}
	
	@PostMapping("")
	public ResponseEntity<?> create (@RequestBody FoodItem foodItem) throws Exception {
	
		var result = foodItemRepository.create(foodItem);
System.out.println("Result: "+ result);
		
		   return ResponseEntity.ok(result); 
	}
	
	@GetMapping("/{id}")
	public ResponseEntity FindById (@PathVariable int id) {
		var item = foodItemRepository.FindById(id);
		return ResponseEntity.ok(item);
	}
	
	
	

}
