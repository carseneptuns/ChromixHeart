import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

const API = `${API_BASE_URL}/products`;
// Get All Products
export const getProducts = () => 
    axios.get(API, { withCredentials: true });

// Get Product By ID
export const getProduct = (id) =>
    axios.get(`${API}/${id}`, { withCredentials: true });

// Create Product
export const createProduct = (formData) =>
    axios.post(API, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
    });

// Update Product
export const updateProduct = (id, formData) =>
    axios.put(`${API}/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
    });

// Delete Product
export const deleteProduct = (id) =>
    axios.delete(`${API}/${id}`, { withCredentials: true });