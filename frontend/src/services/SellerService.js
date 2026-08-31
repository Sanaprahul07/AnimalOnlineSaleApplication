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

export const registerSeller = async (sellerData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, sellerData);

    return response;
  } catch (error) {
    console.error("Seller Registration API Error:", error);
    throw error;
  }
};

// =====================================================
// SELLER LOGIN
// =====================================================

export const loginSeller = async (loginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, loginData);

    return response;
  } catch (error) {
    console.error("Seller Login API Error:", error);
    throw error;
  }
};

// =====================================================
// VERIFY SELLER EMAIL OTP
// =====================================================

export const verifyEmailOtp = async (email, otp) => {
  try {
    const response = await axios.post(`${EMAIL_OTP_URL}/verify`, {
      email: email,
      otp: otp,
    });

    return response;
  } catch (error) {
    console.error("Seller Email OTP Verification API Error:", error);

    throw error;
  }
};

// =====================================================
// RESEND SELLER EMAIL OTP
// =====================================================

export const resendEmailOtp = async (email) => {
  try {
    const response = await axios.post(`${EMAIL_OTP_URL}/send`, {
      email: email,
    });

    return response;
  } catch (error) {
    console.error("Seller Resend OTP API Error:", error);

    throw error;
  }
};

// =====================================================
// GET ALL SELLERS
// =====================================================

export const getAllSellers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getAll`);

    return response;
  } catch (error) {
    console.error("Get All Sellers API Error:", error);

    throw error;
  }
};

// =====================================================
// GET SELLER BY ID
// =====================================================

export const getSellerById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/getById/${id}`);

    return response;
  } catch (error) {
    console.error("Get Seller By ID API Error:", error);

    throw error;
  }
};

// =====================================================
// UPDATE SELLER
// =====================================================

export const updateSeller = async (id, sellerData) => {
  try {
    const response = await axios.put(`${BASE_URL}/update/${id}`, sellerData);

    return response;
  } catch (error) {
    console.error("Update Seller API Error:", error);

    throw error;
  }
};

// =====================================================
// DELETE SELLER
// =====================================================

export const deleteSeller = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete/${id}`);

    return response;
  } catch (error) {
    console.error("Delete Seller API Error:", error);

    throw error;
  }
};

// =====================================================
// GET SELLER ANIMALS
// =====================================================

export const getSellerAnimals = async (sellerId) => {
  try {
    const response = await axios.get(`${ANIMAL_URL}/seller/${sellerId}`);

    return response;
  } catch (error) {
    console.error("Get Seller Animals API Error:", error);

    throw error;
  }
};

// =====================================================
// SELLER FORGOT PASSWORD
// =====================================================
// Only password will be changed.
// Email will remain unchanged.
//
// Backend endpoint expected:
// PUT /api/seller/forgot-password
// =====================================================

export const forgotSellerPassword = async (email, newPassword) => {
  try {
    const response = await axios.put(`${BASE_URL}/forgot-password`, {
      email: email,
      newPassword: newPassword,
    });

    return response;
  } catch (error) {
    console.error("Seller Forgot Password API Error:", error);

    throw error;
  }
};
