import axios from "axios";
import { apiUrl } from "../config/api";

const BASE_URL = apiUrl("/api/orders");

// GET ORDERS BY CUSTOMER / BUYER
export const getOrdersByBuyer = (buyerId) => {
  return axios.get(`${BASE_URL}/buyer/${buyerId}`);
};

// CREATE ORDER AT THE LISTED ASKING PRICE
export const createOrder = (buyerId, animalId) => {
  return axios.post(`${BASE_URL}/create`, null, {
    params: {
      buyerId: Number(buyerId),
      animalId: Number(animalId),
    },
  });
};
