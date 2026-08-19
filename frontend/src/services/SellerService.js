import axios from "axios";


// =====================================================
// BASE URL
// =====================================================

const BASE_URL = "http://localhost:8080/api/seller";

const EMAIL_OTP_URL = "http://localhost:8080/api/email-otp";

const ANIMAL_URL = "http://localhost:8080/api/animal";


// =====================================================
// SELLER REGISTER
// =====================================================
// This API receives FormData.
//
// FormData contains:
// - sellerName
// - ownerName
// - email
// - mobile
// - password
// - businessName
// - farmName
// - aadhaarNumber
// - panNumber
// - address
// - city
// - state
// - pincode
// - location
// - profileImage
// - aadhaarFrontFile
// - aadhaarBackFile
//
// Backend should:
// 1. Save seller information
// 2. Save Aadhaar front image
// 3. Save Aadhaar back image
// 4. Generate email OTP
// 5. Send OTP to seller email
// =====================================================

export const registerSeller = async (sellerData) => {

    try {

        const response = await axios.post(
            `${BASE_URL}/register`,
            sellerData
        );

        return response;

    } catch (error) {

        console.error(
            "Seller Registration API Error:",
            error
        );

        throw error;
    }
};


// =====================================================
// SELLER LOGIN
// =====================================================
// Login with:
// - email
// - password
//
// Expected backend response should contain seller
// information / seller id / login success information.
// =====================================================

export const loginSeller = async (loginData) => {

    try {

        const response = await axios.post(
            `${BASE_URL}/login`,
            loginData
        );

        return response;

    } catch (error) {

        console.error(
            "Seller Login API Error:",
            error
        );

        throw error;
    }
};


// =====================================================
// VERIFY SELLER EMAIL OTP
// =====================================================
// Request:
//
// {
//     email: "seller@gmail.com",
//     otp: "123456"
// }
//
// Backend should:
// 1. Check email
// 2. Check OTP
// 3. Check expiry
// 4. Mark seller email as verified
// 5. Return success response
// =====================================================

export const verifyEmailOtp = async (
    email,
    otp
) => {

    try {

        const response = await axios.post(
            `${EMAIL_OTP_URL}/verify`,
            {
                email: email,
                otp: otp
            }
        );

        return response;

    } catch (error) {

        console.error(
            "Seller Email OTP Verification API Error:",
            error
        );

        throw error;
    }
};


// =====================================================
// RESEND SELLER EMAIL OTP
// =====================================================
// Request:
//
// {
//     email: "seller@gmail.com"
// }
//
// Backend should generate a new OTP and send it
// to the seller's email.
// =====================================================

export const resendEmailOtp = async (
    email
) => {

    try {

        const response = await axios.post(
            `${EMAIL_OTP_URL}/send`,
            {
                email: email
            }
        );

        return response;

    } catch (error) {

        console.error(
            "Seller Resend OTP API Error:",
            error
        );

        throw error;
    }
};


// =====================================================
// GET ALL SELLERS
// =====================================================

export const getAllSellers = async () => {

    try {

        const response = await axios.get(
            `${BASE_URL}/getAll`
        );

        return response;

    } catch (error) {

        console.error(
            "Get All Sellers API Error:",
            error
        );

        throw error;
    }
};


// =====================================================
// GET SELLER BY ID
// =====================================================

export const getSellerById = async (
    id
) => {

    try {

        const response = await axios.get(
            `${BASE_URL}/getById/${id}`
        );

        return response;

    } catch (error) {

        console.error(
            "Get Seller By ID API Error:",
            error
        );

        throw error;
    }
};


// =====================================================
// UPDATE SELLER
// =====================================================

export const updateSeller = async (
    id,
    sellerData
) => {

    try {

        const response = await axios.put(
            `${BASE_URL}/update/${id}`,
            sellerData
        );

        return response;

    } catch (error) {

        console.error(
            "Update Seller API Error:",
            error
        );

        throw error;
    }
};


// =====================================================
// DELETE SELLER
// =====================================================

export const deleteSeller = async (
    id
) => {

    try {

        const response = await axios.delete(
            `${BASE_URL}/delete/${id}`
        );

        return response;

    } catch (error) {

        console.error(
            "Delete Seller API Error:",
            error
        );

        throw error;
    }
};


// =====================================================
// GET SELLER ANIMALS
// =====================================================
// Used by Seller Dashboard / My Animals.
//
// Example:
// /api/animal/seller/1
// =====================================================

export const getSellerAnimals = async (
    sellerId
) => {

    try {

        const response = await axios.get(
            `${ANIMAL_URL}/seller/${sellerId}`
        );

        return response;

    } catch (error) {

        console.error(
            "Get Seller Animals API Error:",
            error
        );

        throw error;
    }
};