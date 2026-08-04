package com.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SellerDto {

    private Long id;

    private String businessName;

    private String ownerName;

    private String email;

    private String mobile;

    private String address;

    private String kycStatus;

    private String approvalStatus;
}