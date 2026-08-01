package com.Service;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.DTO.LoginRequestDto;
import com.DTO.RegisterRequestDto;
import com.DTO.UserDto;
import com.Entity.User;

@Repository
public interface UserService{
	
	UserDto login(LoginRequestDto loginRequestDto);
	
	UserDto register(RegisterRequestDto registerRequestDto);

}
