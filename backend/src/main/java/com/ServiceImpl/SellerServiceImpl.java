package com.ServiceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DTO.LoginRequestDto;
import com.DTO.SellerDto;
import com.DTO.SellerRegisterDto;
import com.Entity.Seller;
import com.Exception.ResourceNotFoundException;
import com.Repository.SellerRepository;
import com.Service.SellerService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class SellerServiceImpl implements SellerService {

	@Autowired
	private SellerRepository sellerRepository;

	@Override
	public SellerDto register(SellerRegisterDto sellerRegisterDto) {

		log.info("Seller Registration Started");

		Optional<Seller> existingSeller = sellerRepository.findByEmail(sellerRegisterDto.getEmail());

		if (existingSeller.isPresent()) {
			throw new RuntimeException("Email Already Exists");
		}

		Seller seller = new Seller();

		seller.setBusinessName(sellerRegisterDto.getBusinessName());
		seller.setOwnerName(sellerRegisterDto.getOwnerName());

		seller.setEmail(sellerRegisterDto.getEmail());
		seller.setMobile(sellerRegisterDto.getMobile());
		seller.setPassword(sellerRegisterDto.getPassword());

		seller.setAddress(sellerRegisterDto.getAddress());
		seller.setCity(sellerRegisterDto.getCity());
		seller.setState(sellerRegisterDto.getState());
		seller.setPincode(sellerRegisterDto.getPincode());

		seller.setAadhaarNumber(sellerRegisterDto.getAadhaarNumber());
		seller.setPanNumber(sellerRegisterDto.getPanNumber());

		seller = sellerRepository.save(seller);

		log.info("Seller Registered Successfully : {}", seller.getId());

		SellerDto response = new SellerDto();

		response.setId(seller.getId());
		response.setBusinessName(seller.getBusinessName());
		response.setOwnerName(seller.getOwnerName());
		response.setEmail(seller.getEmail());
		response.setMobile(seller.getMobile());
		response.setAddress(seller.getAddress());
		response.setKycStatus(seller.getKycStatus());
		response.setApprovalStatus(seller.getApprovalStatus());

		return response;
	}

	@Override
	public SellerDto login(LoginRequestDto loginRequestDto) {

		log.info("Seller Login Started");

		Optional<Seller> seller = sellerRepository.findByEmail(loginRequestDto.getEmail());

		if (!seller.isPresent()) {
			throw new ResourceNotFoundException("Seller Not Found");
		}

		Seller dbSeller = seller.get();

		if (!dbSeller.getPassword().equals(loginRequestDto.getPassword())) {
			throw new ResourceNotFoundException("Invalid Password");
		}

		SellerDto response = new SellerDto();

		response.setId(dbSeller.getId());
		response.setBusinessName(dbSeller.getBusinessName());
		response.setOwnerName(dbSeller.getOwnerName());
		response.setEmail(dbSeller.getEmail());
		response.setMobile(dbSeller.getMobile());
		response.setAddress(dbSeller.getAddress());
		response.setKycStatus(dbSeller.getKycStatus());
		response.setApprovalStatus(dbSeller.getApprovalStatus());

		log.info("Seller Login Successfully");

		return response;
	}

	@Override
	public List<SellerDto> getAllSeller() {

		log.info("Getting All Sellers");

		List<Seller> sellers = sellerRepository.findAll();

		List<SellerDto> response = new ArrayList<>();

		for (Seller seller : sellers) {

			SellerDto dto = new SellerDto();

			dto.setId(seller.getId());
			dto.setBusinessName(seller.getBusinessName());
			dto.setOwnerName(seller.getOwnerName());
			dto.setEmail(seller.getEmail());
			dto.setMobile(seller.getMobile());
			dto.setAddress(seller.getAddress());
			dto.setKycStatus(seller.getKycStatus());
			dto.setApprovalStatus(seller.getApprovalStatus());

			response.add(dto);
		}

		return response;
	}

	@Override
	public SellerDto getSellerById(Long id) {

		log.info("Getting Seller By Id : {}", id);

		Optional<Seller> seller = sellerRepository.findById(id);

		if (!seller.isPresent()) {
			throw new ResourceNotFoundException("Seller Not Found");
		}

		Seller dbSeller = seller.get();

		SellerDto response = new SellerDto();

		response.setId(dbSeller.getId());
		response.setBusinessName(dbSeller.getBusinessName());
		response.setOwnerName(dbSeller.getOwnerName());
		response.setEmail(dbSeller.getEmail());
		response.setMobile(dbSeller.getMobile());
		response.setAddress(dbSeller.getAddress());
		response.setKycStatus(dbSeller.getKycStatus());
		response.setApprovalStatus(dbSeller.getApprovalStatus());

		return response;
	}

	@Override
	public SellerDto updateSeller(Long id, SellerRegisterDto sellerRegisterDto) {

		log.info("Updating Seller : {}", id);

		Optional<Seller> seller = sellerRepository.findById(id);

		if (!seller.isPresent()) {
			throw new ResourceNotFoundException("Seller Not Found");
		}

		Seller dbSeller = seller.get();

		dbSeller.setBusinessName(sellerRegisterDto.getBusinessName());
		dbSeller.setOwnerName(sellerRegisterDto.getOwnerName());

		dbSeller.setEmail(sellerRegisterDto.getEmail());
		dbSeller.setMobile(sellerRegisterDto.getMobile());
		dbSeller.setPassword(sellerRegisterDto.getPassword());

		dbSeller.setAddress(sellerRegisterDto.getAddress());
		dbSeller.setCity(sellerRegisterDto.getCity());
		dbSeller.setState(sellerRegisterDto.getState());
		dbSeller.setPincode(sellerRegisterDto.getPincode());

		dbSeller.setAadhaarNumber(sellerRegisterDto.getAadhaarNumber());
		dbSeller.setPanNumber(sellerRegisterDto.getPanNumber());

		dbSeller = sellerRepository.save(dbSeller);

		SellerDto response = new SellerDto();

		response.setId(dbSeller.getId());
		response.setBusinessName(dbSeller.getBusinessName());
		response.setOwnerName(dbSeller.getOwnerName());
		response.setEmail(dbSeller.getEmail());
		response.setMobile(dbSeller.getMobile());
		response.setAddress(dbSeller.getAddress());
		response.setKycStatus(dbSeller.getKycStatus());
		response.setApprovalStatus(dbSeller.getApprovalStatus());

		return response;
	}

	@Override
	public String deleteSeller(Long id) {

		log.info("Delete Seller Started : {}", id);

		Optional<Seller> seller = sellerRepository.findById(id);

		if (!seller.isPresent()) {
			throw new ResourceNotFoundException("Seller Not Found");
		}

		Seller dbSeller = seller.get();

		sellerRepository.delete(dbSeller);

		log.info("Seller Deleted Successfully");

		return "Seller Deleted Successfully";
	}

}
