import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

const API = `${API_BASE_URL}/cart`;

export const addCart = (data) =>
    axios.post(API, data);

export const getCart = (user_id) =>
    axios.get(`${API}/${user_id}`);

export const updateCart = (id, quantity) =>
    axios.put(`${API}/${id}`, { quantity });

export const deleteCart = (id) =>
    axios.delete(`${API}/${id}`);
