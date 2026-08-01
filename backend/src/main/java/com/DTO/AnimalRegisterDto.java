package com.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor	
public class AnimalRegisterDto {
	

    private String animalName;

    private String category;

    private String breed;

    private Integer age;

    private Double price;

    private String gender;

    private String description;

    private String location;

    private String imageUrl;

}
