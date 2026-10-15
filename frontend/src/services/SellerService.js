import axios from "axios";
import { apiUrl } from "../config/api";

const BASE_URL = apiUrl("/api/seller");
const EMAIL_OTP_URL = apiUrl("/api/email-otp");
const ANIMAL_URL = apiUrl("/api/animal");
const PAYMENT_URL = apiUrl("/api/payments");

// SELLER REGISTER
export const registerSeller = async (sellerData) => {
  try {
    return await axios.post(`${BASE_URL}/register`, sellerData);
  } catch (error) {
    console.error("Seller Registration API Error:", error);
    throw error;
  }
};

// SELLER LOGIN
export const loginSeller = async (loginData) => {
  try {
    return await axios.post(`${BASE_URL}/login`, loginData);
  } catch (error) {
    console.error("Seller Login API Error:", error);
    throw error;
  }
};

// VERIFY SELLER EMAIL OTP
export const verifyEmailOtp = async (email, otp) => {
  try {
    return await axios.post(`${EMAIL_OTP_URL}/verify`, {
      email,
      otp,
    });
  } catch (error) {
    console.error("Seller Email OTP Verification API Error:", error);
    throw error;
  }
};

// RESEND SELLER EMAIL OTP
export const resendEmailOtp = async (email) => {
  try {
    return await axios.post(`${EMAIL_OTP_URL}/send`, {
      email,
    });
  } catch (error) {
    console.error("Seller Resend OTP API Error:", error);
    throw error;
  }
};

// GET ALL SELLERS
export const getAllSellers = async () => {
  try {
    return await axios.get(`${BASE_URL}/getAll`);
  } catch (error) {
    console.error("Get All Sellers API Error:", error);
    throw error;
  }
};

// GET SELLER BY ID
export const getSellerById = async (id) => {
  try {
    return await axios.get(`${BASE_URL}/getById/${id}`);
  } catch (error) {
    console.error("Get Seller By ID API Error:", error);
    throw error;
  }
};

// UPDATE SELLER
export const updateSeller = async (id, sellerData) => {
  try {
    return await axios.put(`${BASE_URL}/update/${id}`, sellerData);
  } catch (error) {
    console.error("Update Seller API Error:", error);
    throw error;
  }
};

// DELETE SELLER
export const deleteSeller = async (id) => {
  try {
    return await axios.delete(`${BASE_URL}/delete/${id}`);
  } catch (error) {
    console.error("Delete Seller API Error:", error);
    throw error;
  }
};

// GET SELLER ANIMALS
export const getSellerAnimals = async (sellerId) => {
  try {
    return await axios.get(`${ANIMAL_URL}/seller/${sellerId}`);
  } catch (error) {
    console.error("Get Seller Animals API Error:", error);
    throw error;
  }
};

// FORGOT PASSWORD
export const forgotSellerPassword = async (email, newPassword) => {
  try {
    return await axios.put(`${BASE_URL}/forgot-password`, {
      email,
      newPassword,
    });
  } catch (error) {
    console.error("Seller Forgot Password API Error:", error);
    throw error;
  }
};

// GET ACTIVE SUBSCRIPTION PLANS
export const getSellerSubscriptionPlans = async () => {
  try {
    return await axios.get(`${BASE_URL}/subscriptions/plans`);
  } catch (error) {
    console.error("Get Seller Subscription Plans API Error:", error);
    throw error;
  }
};

// GET CURRENT SELLER SUBSCRIPTION
export const getCurrentSellerSubscription = async (sellerId) => {
  try {
    return await axios.get(`${BASE_URL}/subscriptions/current/${sellerId}`);
  } catch (error) {
    console.error("Get Current Seller Subscription Error:", error);
    throw error;
  }
};

// SUBMIT SELLER PAYMENT
export const submitSellerPayment = async (
  sellerId,
  subscriptionId,
  transactionId,
  paymentScreenshot,
) => {
  try {
    const formData = new FormData();

    formData.append("sellerId", sellerId);
    formData.append("subscriptionId", subscriptionId);
    formData.append("transactionId", transactionId);
    formData.append("paymentScreenshot", paymentScreenshot);

    return await axios.post(`${PAYMENT_URL}/submit`, formData);
  } catch (error) {
    console.error("Seller Payment API Error:", error);
    throw error;
  }
};
