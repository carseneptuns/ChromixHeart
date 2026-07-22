import axios from "axios";

const API = "https://chromixheart-copy-production.up.railway.app/api/profile";

export const getProfile = (id) =>
    axios.get(`${API}/${id}`);

export const updateProfile = (id, data) =>
    axios.put(`${API}/${id}`, data);
