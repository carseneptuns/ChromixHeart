import axios from "axios";

const API = "https://chromixheart-copy-production.up.railway.app/api/transactions";

// BUY NOW
export const createTransaction = (data) => {
    return axios.post(API, data);
};

// CART CHECKOUT
export const checkoutCart = (data) => {
    return axios.post(`${API}/checkout`, data);
};

// GET DETAIL TRANSACTION
export const getTransaction = (id) => {
    return axios.get(`${API}/${id}`);
};

// CONFIRM PAYMENT
export const confirmPayment = (id, payment_method) => {
    return axios.put(`${API}/${id}/payment`, {
        payment_method
    });
};

export const getUserTransactions = (user_id) => {
    return axios.get(`${API}/user/${user_id}`);
};
