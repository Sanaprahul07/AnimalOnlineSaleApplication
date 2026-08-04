package com.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.DTO.LoginRequestDto;
import com.DTO.SellerDto;
import com.DTO.SellerRegisterDto;
import com.Service.SellerService;

@RestController
@RequestMapping("/api/seller")
@CrossOrigin("*")
public class SellerController {

	@Autowired
	private SellerService sellerService;

	@PostMapping("/register")
	public SellerDto register(@RequestBody SellerRegisterDto sellerRegisterDto) {

		return sellerService.register(sellerRegisterDto);

	}

	@PostMapping("/login")
	public SellerDto login(@RequestBody LoginRequestDto loginRequestDto) {
		return sellerService.login(loginRequestDto);
	}

	@GetMapping("/getAll")
	public List<SellerDto> getAllSeller() {

		return sellerService.getAllSeller();
	}

	@GetMapping("/getBuID/{id}")
	public SellerDto getSellerById(@PathVariable Long id) {
		return sellerService.getSellerById(id);
	}

	@PutMapping("/update/{id}")
	public SellerDto updateSeller(@PathVariable Long id, @RequestBody SellerRegisterDto sellerRegisterDto) {

		return sellerService.updateSeller(id, sellerRegisterDto);
	}
	
	@DeleteMapping("/delete/{id}")
	public String deleteSeller(@PathVariable Long id) {

	    return sellerService.deleteSeller(id);

	}

}