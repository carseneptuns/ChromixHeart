import axios from "axios";

const API = "https://chromixheart-production-6072.up.railway.app/api/products";

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