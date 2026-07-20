import axios from "axios";

const API = "http://localhost:5000/api/products";

// Get All Products
export const getProducts = () => axios.get(API);

// Get Product By ID
export const getProduct = (id) =>
    axios.get(`${API}/${id}`);

// Create Product
export const createProduct = (formData) =>
    axios.post(API, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

// Update Product
export const updateProduct = (id, formData) =>
    axios.put(`${API}/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

// Delete Product
export const deleteProduct = (id) =>
    axios.delete(`${API}/${id}`);