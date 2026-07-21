import axios from "axios";

const API = "http://localhost:5000/api/profile";

export const getProfile = (id) =>
    axios.get(`${API}/${id}`);

export const updateProfile = (id, data) =>
    axios.put(`${API}/${id}`, data);