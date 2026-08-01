package com.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SellerRegisterDto {
	

    // Business Information
    private String businessName;
    private String ownerName;

    // Login Information
    private String email;
    private String mobile;
    private String password;

    // Address Information
    private String address;
    private String city;
    private String state;
    private String pincode;

    // KYC Information
    private String aadhaarNumber;
    private String panNumber;

}
