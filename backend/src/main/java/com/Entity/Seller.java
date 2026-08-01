package com.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;
import lombok.Setter;

@Entity
@Data
public class Seller {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	  private String sellerName;
	    private String email;
	    private String mobile;
	    private String password;

	    // Address Details
	    private String address;
	    private String city;
	    private String state;
	    private String pincode;

	    // Business Details
	    private String farmName;

	    // Government ID
	    private String aadhaarNumber;

	    // Profile
	    private String profileImage;

	    // Approval Status
	    private String status = "pending ";
	    
	    
	 // Business Information
	    private String businessName;

	    private String ownerName;

	    // KYC Information
	    private String panNumber;

	    // Approval Details
	    private String kycStatus;

	    private String approvalStatus;

}
