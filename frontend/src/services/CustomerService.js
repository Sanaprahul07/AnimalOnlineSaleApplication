import axios from "axios";
import { apiUrl } from "../config/api";

const BASE_URL = apiUrl("/api/customer");

// CUSTOMER REGISTRATION
export const registerCustomer = (customerData) => {
  return axios.post(`${BASE_URL}/register`, customerData);
};

// CUSTOMER LOGIN
export const loginCustomer = (loginData) => {
  return axios.post(`${BASE_URL}/login`, loginData);
};

// GET CUSTOMER BY ID
export const getCustomerById = (customerId) => {
  return axios.get(`${BASE_URL}/get/${customerId}`);
};

// UPDATE CUSTOMER
export const updateCustomer = (customerId, customerData) => {
  return axios.put(`${BASE_URL}/update/${customerId}`, customerData);
};
