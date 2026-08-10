import axios from "axios";

const BASE_URL = "http://localhost:8080/api/seller";


// =====================================
// SELLER REGISTER
// =====================================

export const registerSeller = (sellerData) => {

    return axios.post(
        `${BASE_URL}/register`,
        sellerData
    );

};


// =====================================
// SELLER LOGIN
// =====================================

export const loginSeller = (loginData) => {

    return axios.post(
        `${BASE_URL}/login`,
        loginData
    );

};


// =====================================
// GET ALL SELLERS
// =====================================

export const getAllSellers = () => {

    return axios.get(
        `${BASE_URL}/getAll`
    );

};


// =====================================
// GET SELLER BY ID
// =====================================

export const getSellerById = (id) => {

    return axios.get(
        `${BASE_URL}/getById/${id}`
    );

};


// =====================================
// UPDATE SELLER
// =====================================

export const updateSeller = (id, sellerData) => {

    return axios.put(
        `${BASE_URL}/update/${id}`,
        sellerData
    );

};


// =====================================
// DELETE SELLER
// =====================================

export const deleteSeller = (id) => {

    return axios.delete(
        `${BASE_URL}/delete/${id}`
    );

};


// =====================================
// GET SELLER ANIMALS
// =====================================

export const getSellerAnimals = (sellerId) => {

    return axios.get(
        `http://localhost:8080/api/animal/seller/${sellerId}`
    );

};