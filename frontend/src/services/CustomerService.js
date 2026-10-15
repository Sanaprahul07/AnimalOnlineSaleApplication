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
