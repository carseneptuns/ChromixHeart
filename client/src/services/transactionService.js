import axios from "axios";

const API = "http://localhost:5000/api/transactions";

// BUY NOW
export const createTransaction = (data) => {
    return axios.post(API, data);
};

// CART CHECKOUT
export const checkoutCart = (user_id) => {
    return axios.post(`${API}/checkout`, {
        user_id
    });
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

    return axios.get(

        `${API}/user/${user_id}`

    );

};