import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

const API = `${API_BASE_URL}/profile`;

export const getProfile = (id) =>
    axios.get(`${API}/${id}`);

export const updateProfile = (id, data) =>
    axios.put(`${API}/${id}`, data);
