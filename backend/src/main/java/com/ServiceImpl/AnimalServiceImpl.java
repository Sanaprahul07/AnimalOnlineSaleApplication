package com.ServiceImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DTO.AnimalDto;
import com.DTO.AnimalRegisterDto;
import com.Entity.Animal;
import com.Exception.ResourceNotFoundException;
import com.Repository.AnimalRepository;
import com.Service.AnimalService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AnimalServiceImpl implements AnimalService {

	@Autowired
	private AnimalRepository animalRepository;

	@Override
	public AnimalDto addAnimal(AnimalRegisterDto animalRegisterDto) {

	    log.info("Animal Registration Started");

	    Animal animal = new Animal();

	    // DTO -> Entity Mapping
	    animal.setAnimalName(animalRegisterDto.getAnimalName());
	    animal.setCategory(animalRegisterDto.getCategory());
	    animal.setBreed(animalRegisterDto.getBreed());
	    animal.setAge(animalRegisterDto.getAge());
	    animal.setPrice(animalRegisterDto.getPrice());
	    animal.setGender(animalRegisterDto.getGender());
	    animal.setDescription(animalRegisterDto.getDescription());
	    animal.setLocation(animalRegisterDto.getLocation());
	    animal.setImageUrl(animalRegisterDto.getImageUrl());

	    // Default Value
	    animal.setAvailable(true);

	    // Save into Database
	    animal = animalRepository.save(animal);

	    log.info("Animal Added Successfully : {}", animal.getId());

	    // Entity -> DTO Mapping
	    AnimalDto response = new AnimalDto();

	    response.setId(animal.getId());
	    response.setAnimalName(animal.getAnimalName());
	    response.setCategory(animal.getCategory());
	    response.setBreed(animal.getBreed());
	    response.setAge(animal.getAge());
	    response.setPrice(animal.getPrice());
	    response.setGender(animal.getGender());
	    response.setDescription(animal.getDescription());
	    response.setLocation(animal.getLocation());
	    response.setImageUrl(animal.getImageUrl());
	    response.setAvailable(animal.getAvailable());

	    return response;
	}

	@Override
	public List<AnimalDto> getAllAnimals() {

	    log.info("Getting All Animals");

	    List<Animal> animals = animalRepository.findAll();

	    List<AnimalDto> response = new ArrayList<>();

	    for (Animal animal : animals) {

	        AnimalDto dto = new AnimalDto();

	        dto.setId(animal.getId());
	        dto.setAnimalName(animal.getAnimalName());
	        dto.setCategory(animal.getCategory());
	        dto.setBreed(animal.getBreed());
	        dto.setAge(animal.getAge());
	        dto.setPrice(animal.getPrice());
	        dto.setGender(animal.getGender());
	        dto.setDescription(animal.getDescription());
	        dto.setLocation(animal.getLocation());
	        dto.setImageUrl(animal.getImageUrl());
	        dto.setAvailable(animal.getAvailable());

	        response.add(dto);
	    }

	    log.info("Total Animals Found : {}", response.size());

	    return response;
	}

	@Override
	public AnimalDto getAnimalById(Long id) {

	    log.info("Getting Animal By Id : {}", id);

	    Animal animal = animalRepository.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundException("Animal Not Found"));

	    AnimalDto response = new AnimalDto();

	    response.setId(animal.getId());
	    response.setAnimalName(animal.getAnimalName());
	    response.setCategory(animal.getCategory());
	    response.setBreed(animal.getBreed());
	    response.setAge(animal.getAge());
	    response.setPrice(animal.getPrice());
	    response.setGender(animal.getGender());
	    response.setDescription(animal.getDescription());
	    response.setLocation(animal.getLocation());
	    response.setImageUrl(animal.getImageUrl());
	    response.setAvailable(animal.getAvailable());

	    log.info("Animal Found Successfully");

	    return response;
	}

	@Override
	public AnimalDto updateAnimal(Long id, AnimalRegisterDto animalRegisterDto) {

	    log.info("Updating Animal : {}", id);

	    Animal animal = animalRepository.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundException("Animal Not Found"));

	    animal.setAnimalName(animalRegisterDto.getAnimalName());
	    animal.setCategory(animalRegisterDto.getCategory());
	    animal.setBreed(animalRegisterDto.getBreed());
	    animal.setAge(animalRegisterDto.getAge());
	    animal.setPrice(animalRegisterDto.getPrice());
	    animal.setGender(animalRegisterDto.getGender());
	    animal.setDescription(animalRegisterDto.getDescription());
	    animal.setLocation(animalRegisterDto.getLocation());
	    animal.setImageUrl(animalRegisterDto.getImageUrl());

	    animal = animalRepository.save(animal);

	    AnimalDto response = new AnimalDto();

	    response.setId(animal.getId());
	    response.setAnimalName(animal.getAnimalName());
	    response.setCategory(animal.getCategory());
	    response.setBreed(animal.getBreed());
	    response.setAge(animal.getAge());
	    response.setPrice(animal.getPrice());
	    response.setGender(animal.getGender());
	    response.setDescription(animal.getDescription());
	    response.setLocation(animal.getLocation());
	    response.setImageUrl(animal.getImageUrl());
	    response.setAvailable(animal.getAvailable());

	    log.info("Animal Updated Successfully");

	    return response;
	}

	@Override
	public String deleteAnimal(Long id) {

	    log.info("Deleting Animal : {}", id);

	    Animal animal = animalRepository.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundException("Animal Not Found"));

	    animalRepository.delete(animal);

	    log.info("Animal Deleted Successfully");

	    return "Animal Deleted Successfully";
	}
	
}
