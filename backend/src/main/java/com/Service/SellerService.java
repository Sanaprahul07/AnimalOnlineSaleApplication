package com.Service;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.DTO.LoginRequestDto;
import com.DTO.SellerDto;
import com.DTO.SellerRegisterDto;

@Repository
public interface SellerService {
	
	SellerDto register(SellerRegisterDto sellerRegisterDto);

	SellerDto login(LoginRequestDto loginRequestDto);

	List<SellerDto> getAllSeller();

	SellerDto getSellerById(Long id);

	SellerDto updateSeller(Long id, SellerRegisterDto sellerRegisterDto);

	String deleteSeller(Long id);

}
