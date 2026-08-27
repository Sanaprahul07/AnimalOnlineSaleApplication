import axios from "axios";

// =====================================================
// BASE URL
// =====================================================

const BASE_URL = "http://localhost:8080/api";

// =====================================================
// ADMIN SERVICE
// =====================================================

const AdminService = {

    // =================================================
    // ADMIN LOGIN
    // =================================================

    loginAdmin: async (email, password) => {
        return axios.post(
            `${BASE_URL}/auth/login`,
            {
                email: email,
                password: password
            }
        );
    },

    // =================================================
    // GET ALL SELLERS
    // =================================================

    getAllSellers: async () => {
        return axios.get(
            `${BASE_URL}/seller/getAll`
        );
    },

    // =================================================
    // GET SELLER BY ID
    // =================================================

    getSellerById: async (id) => {
        return axios.get(
            `${BASE_URL}/seller/${id}`
        );
    },

    // =================================================
    // GET ALL CUSTOMERS
    // =================================================

    getAllCustomers: async () => {
        return axios.get(
            `${BASE_URL}/customer/getAll`
        );
    },

    // =================================================
    // GET CUSTOMER BY ID
    // =================================================

    getCustomerById: async (id) => {
        return axios.get(
            `${BASE_URL}/customer/${id}`
        );
    },

    // =================================================
    // GET ALL ANIMALS
    // =================================================

    getAllAnimals: async () => {
        return axios.get(
            `${BASE_URL}/animal/getAll`
        );
    },

    // =================================================
    // GET ANIMAL BY ID
    // =================================================

    getAnimalById: async (id) => {
        return axios.get(
            `${BASE_URL}/animal/${id}`
        );
    },

    // =================================================
    // DELETE ANIMAL
    // =================================================

    deleteAnimal: async (id) => {
        return axios.delete(
            `${BASE_URL}/animal/delete/${id}`
        );
    },

    // =================================================
    // GET ALL CATEGORIES
    // =================================================

    getAllCategories: async () => {
        return axios.get(
            `${BASE_URL}/category/getAll`
        );
    },

    // =================================================
    // GET CATEGORY BY ID
    // =================================================

    getCategoryById: async (id) => {
        return axios.get(
            `${BASE_URL}/category/${id}`
        );
    },

    // =================================================
    // ADD CATEGORY
    // =================================================

    addCategory: async (categoryData) => {
        return axios.post(
            `${BASE_URL}/category/add`,
            categoryData
        );
    },

    // =================================================
    // UPDATE CATEGORY
    // =================================================

    updateCategory: async (id, categoryData) => {
        return axios.put(
            `${BASE_URL}/category/update/${id}`,
            categoryData
        );
    },

    // =================================================
    // DELETE CATEGORY
    // =================================================

    deleteCategory: async (id) => {
        return axios.delete(
            `${BASE_URL}/category/delete/${id}`
        );
    }
};

export default AdminService;