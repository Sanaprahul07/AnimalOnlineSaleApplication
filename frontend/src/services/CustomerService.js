 import axios from "axios";

const BASE_URL = "http://localhost:8080/api/customer";

// Customer Registration
export const registerCustomer = (customerData) => {
    return axios.post(`${BASE_URL}/register`, customerData);
};

// Customer Login
export const loginCustomer = (loginData) => {
    return axios.post(`${BASE_URL}/login`, loginData);
};