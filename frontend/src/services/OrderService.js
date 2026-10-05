import axios from "axios";

const BASE_URL = "http://localhost:8080/api/orders";

// =====================================================
// GET ORDERS BY CUSTOMER / BUYER
// =====================================================

export const getOrdersByBuyer = (buyerId) => {
  return axios.get(`${BASE_URL}/buyer/${buyerId}`);
};
