package com.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Entity.Animal;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {

}
