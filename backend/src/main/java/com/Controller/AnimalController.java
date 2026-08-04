package com.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DTO.AnimalDto;
import com.DTO.AnimalRegisterDto;
import com.Service.AnimalService;

import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@Slf4j
@RequestMapping("/api/animal")
public class AnimalController {

	@Autowired
	private AnimalService animalService;

	@PostMapping("/add")
	public AnimalDto addAnimal(@RequestBody AnimalRegisterDto animalRegisterDto) {

		return animalService.addAnimal(animalRegisterDto);

	}
	
	@GetMapping("/getAll")
	public List<AnimalDto> getAllAnimals() {
	    return animalService.getAllAnimals();
	}
	
	@GetMapping("/{id}")
	public AnimalDto getAnimalById(@PathVariable Long id) {

	    return animalService.getAnimalById(id);

	}
	
	@PutMapping("/update/{id}")
	public AnimalDto updateAnimal(@PathVariable Long id,
	                              @RequestBody AnimalRegisterDto animalRegisterDto) {

	    return animalService.updateAnimal(id, animalRegisterDto);

	}
	@DeleteMapping("/delete/{id}")
	public String deleteAnimal(@PathVariable Long id) {

	    return animalService.deleteAnimal(id);

	}

}
