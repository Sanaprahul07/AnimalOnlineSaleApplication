package com.Service;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.DTO.AnimalDto;
import com.DTO.AnimalRegisterDto;
import com.DTO.SellerDto;

@Repository
public interface AnimalService {
	
	AnimalDto addAnimal(AnimalRegisterDto animalRegisterDto);
	
	List<AnimalDto> getAllAnimals();
	
	AnimalDto getAnimalById(Long id);
	
	AnimalDto updateAnimal(Long id, AnimalRegisterDto animalRegisterDto);
	
	String deleteAnimal(Long id);
	

}
