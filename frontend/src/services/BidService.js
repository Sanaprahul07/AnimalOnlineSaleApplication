import axios from "axios";

// =====================================================
// BID BASE URL
// =====================================================

const BASE_URL = "http://localhost:8080/api/bids";

// =====================================================
// CREATE BID
// =====================================================

export const createBid = (customerId, animalId, bidAmount) => {
  return axios.post(`${BASE_URL}/create`, null, {
    params: {
      customerId: customerId,
      animalId: animalId,
      bidAmount: bidAmount,
    },
  });
};

// =====================================================
// GET ALL BIDS
// =====================================================

export const getAllBids = () => {
  return axios.get(`${BASE_URL}`);
};

// =====================================================
// GET BID BY ID
// =====================================================

export const getBidById = (id) => {
  return axios.get(`${BASE_URL}/${id}`);
};

// =====================================================
// GET BIDS BY CUSTOMER
// =====================================================

export const getBidsByCustomer = (customerId) => {
  return axios.get(`${BASE_URL}/customer/${customerId}`);
};

// =====================================================
// GET BIDS BY ANIMAL
// =====================================================

export const getBidsByAnimal = (animalId) => {
  return axios.get(`${BASE_URL}/animal/${animalId}`);
};

// =====================================================
// GET BIDS BY STATUS
// =====================================================

export const getBidsByStatus = (status) => {
  return axios.get(`${BASE_URL}/status/${status}`);
};

// =====================================================
// UPDATE BID STATUS
// =====================================================

export const updateBidStatus = (id, status) => {
  return axios.put(`${BASE_URL}/${id}/status`, null, {
    params: {
      status: status,
    },
  });
};
