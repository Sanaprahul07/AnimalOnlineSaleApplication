import axios from "axios";

// =====================================================
// CHAT BASE URL
// =====================================================

const BASE_URL = "http://localhost:8080/api/chat";

// =====================================================
// GET CUSTOMER CHAT INBOX
// =====================================================

export const getCustomerInbox = (customerId) => {
  return axios.get(`${BASE_URL}/customer/${customerId}/inbox`);
};