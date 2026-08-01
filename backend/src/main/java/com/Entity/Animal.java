package com.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Animal {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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

	@ManyToOne
	@JoinColumn(name = "seller_id")
	private Seller seller;

}
