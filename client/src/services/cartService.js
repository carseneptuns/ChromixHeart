import axios from "axios";

const API = "http://localhost:5000/api/cart";

export const addCart = (data) =>
    axios.post(API, data);

export const getCart = (user_id) =>
    axios.get(`${API}/${user_id}`);

export const updateCart = (id, quantity) =>
    axios.put(`${API}/${id}`, { quantity });

export const deleteCart = (id) =>
    axios.delete(`${API}/${id}`);