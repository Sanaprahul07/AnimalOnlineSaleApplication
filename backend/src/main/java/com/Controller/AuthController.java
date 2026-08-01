package com.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DTO.LoginRequestDto;
import com.DTO.RegisterRequestDto;
import com.DTO.UserDto;
import com.Service.UserService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/auth")
@Slf4j
public class AuthController {
	
	@Autowired
	private UserService userService;
	
    @PostMapping("/login")
    public UserDto login(@RequestBody LoginRequestDto loginRequestDto) {

        log.info("Login API Called");

        return userService.login(loginRequestDto);
    }
    
    @PostMapping("/register")
    public UserDto register(@RequestBody RegisterRequestDto registerRequestDto) {

        log.info("Register API Called");

        return userService.register(registerRequestDto);

    }
	

}

