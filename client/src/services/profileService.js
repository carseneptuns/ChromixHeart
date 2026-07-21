import axios from "axios";

const API = "http://chromixheart-production-6072.up.railway.app/api/profile";

export const getProfile = (id) =>
    axios.get(`${API}/${id}`);

export const updateProfile = (id, data) =>
    axios.put(`${API}/${id}`, data);
