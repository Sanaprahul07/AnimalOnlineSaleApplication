package com.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnimalDto {

	private Long id;

    private String animalName;

    private String category;

    private String breed;

    private Integer age;

    private Double price;

    private String gender;

    private String description;

    private String location;

    private String imageUrl;

    private Boolean available;
}
