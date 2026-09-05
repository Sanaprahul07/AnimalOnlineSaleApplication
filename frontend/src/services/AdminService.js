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
    // GET ADMIN DASHBOARD DATA
    // =================================================

    getDashboard: async () => {
        return axios.get(
            `${BASE_URL}/admin/dashboard`
        );
    },

    // =================================================
    // GET SELLER DETAILS WITH ANIMALS
    // =================================================

    getAdminSellerById: async (id) => {
        return axios.get(
            `${BASE_URL}/admin/sellers/${id}`
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
    },

    // =================================================
    // SUBSCRIPTION PLAN MODULE
    // =================================================

    // GET ALL SUBSCRIPTION PLANS

    getAllSubscriptionPlans: async () => {
        return axios.get(
            `${BASE_URL}/admin/subscriptions/plans`
        );
    },

    // GET SUBSCRIPTION PLAN BY ID

    getSubscriptionPlanById: async (id) => {
        return axios.get(
            `${BASE_URL}/admin/subscriptions/plans/${id}`
        );
    },

    // ADD SUBSCRIPTION PLAN

    addSubscriptionPlan: async (planData) => {
        return axios.post(
            `${BASE_URL}/admin/subscriptions/plans`,
            planData
        );
    },

    // UPDATE SUBSCRIPTION PLAN

    updateSubscriptionPlan: async (id, planData) => {
        return axios.put(
            `${BASE_URL}/admin/subscriptions/plans/${id}`,
            planData
        );
    },

    // ACTIVATE SUBSCRIPTION PLAN

    activateSubscriptionPlan: async (id) => {
        return axios.put(
            `${BASE_URL}/admin/subscriptions/plans/${id}/activate`
        );
    },

    // DEACTIVATE SUBSCRIPTION PLAN

    deactivateSubscriptionPlan: async (id) => {
        return axios.put(
            `${BASE_URL}/admin/subscriptions/plans/${id}/deactivate`
        );
    },

    // DELETE SUBSCRIPTION PLAN

    deleteSubscriptionPlan: async (id) => {
        return axios.delete(
            `${BASE_URL}/admin/subscriptions/plans/${id}`
        );
    },

    // =================================================
    // SELLER PAYMENT MODULE
    // =================================================

    // GET SELLER LATEST PAYMENT
    // Payment screenshot + payment status +
    // subscription details

    getSellerLatestPayment: async (sellerId) => {
        return axios.get(
            `${BASE_URL}/payments/seller/${sellerId}/latest`
        );
    },

    // GET ALL PAYMENTS OF SELLER

    getSellerPayments: async (sellerId) => {
        return axios.get(
            `${BASE_URL}/payments/seller/${sellerId}`
        );
    },

    // GET ALL PENDING PAYMENTS FOR ADMIN

    getPendingPayments: async () => {
        return axios.get(
            `${BASE_URL}/payments/admin/pending`
        );
    },

    // APPROVE SELLER PAYMENT

    approveSellerPayment: async (paymentId) => {
        return axios.put(
            `${BASE_URL}/payments/admin/${paymentId}/approve`
        );
    },

    // REJECT SELLER PAYMENT

    rejectSellerPayment: async (paymentId) => {
        return axios.put(
            `${BASE_URL}/payments/admin/${paymentId}/reject`
        );
    }
};

// =====================================================
// EXPORT
// =====================================================

export default AdminService;