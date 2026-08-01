package com.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Entity.Seller;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {
	
	Optional<Seller> findByEmail(String email);

    Optional<Seller> findByMobile(String mobile);


}
