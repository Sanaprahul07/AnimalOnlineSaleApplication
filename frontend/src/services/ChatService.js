import axios from "axios";
import { apiUrl } from "../config/api";

const BASE_URL = apiUrl("/api/chat");

// GET CUSTOMER CHAT INBOX
export const getCustomerInbox = (customerId) => {
  return axios.get(`${BASE_URL}/customer/${customerId}/inbox`);
};
