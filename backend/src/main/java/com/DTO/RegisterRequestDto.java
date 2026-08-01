package com.DTO;

import lombok.Data;

@Data
public class RegisterRequestDto {
	
	private String fullName;

    private String email;

    private String mobile;

    private String password;

    private String role;

}
