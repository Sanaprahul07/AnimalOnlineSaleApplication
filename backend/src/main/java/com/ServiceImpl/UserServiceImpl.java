package com.ServiceImpl;

import java.util.Optional;

import javax.management.RuntimeErrorException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DTO.LoginRequestDto;
import com.DTO.RegisterRequestDto;
import com.DTO.UserDto;
import com.Entity.User;
import com.Exception.ResourceNotFoundException;
import com.Repository.UserRepository;
import com.Service.UserService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	


	@Override
	public UserDto login(LoginRequestDto loginRequestDto) {

		log.info("user login staret");

		Optional<User> user = userRepository.findByEmail(loginRequestDto.getEmail());
		
		log.info("User Found : {}", user.isPresent());

		if (!user.isPresent()) {
			throw new ResourceNotFoundException("Invalid Password");
		}

		User dbuser = user.get();
		if (!dbuser.getPassword().equals(loginRequestDto.getPassword())) {
			throw new RuntimeException("Invalid Password");

		}

		UserDto response = new UserDto();
		response.setId(dbuser.getId());
		response.setFullName(dbuser.getFullName());
		response.setEmail(dbuser.getEmail());
		response.setMobile(dbuser.getMobile());
		response.setRole(dbuser.getRole());

		return response;
	}



	@Override
	public UserDto register(RegisterRequestDto registerRequestDto) {

	    log.info("Admin Registration Started");

	    Optional<User> user = userRepository.findByEmail(registerRequestDto.getEmail());

	    if (user.isPresent()) {
	        throw new ResourceNotFoundException("Email Already Exists");
	    }

	    User newUser = new User();

	    newUser.setFullName(registerRequestDto.getFullName());
	    newUser.setEmail(registerRequestDto.getEmail());
	    newUser.setMobile(registerRequestDto.getMobile());
	    newUser.setPassword(registerRequestDto.getPassword());
	    newUser.setRole(registerRequestDto.getRole());

	    User savedUser = userRepository.save(newUser);

	    UserDto response = new UserDto();

	    response.setId(savedUser.getId());
	    response.setFullName(savedUser.getFullName());
	    response.setEmail(savedUser.getEmail());
	    response.setMobile(savedUser.getMobile());
	    response.setRole(savedUser.getRole());

	    return response;
	}
}
