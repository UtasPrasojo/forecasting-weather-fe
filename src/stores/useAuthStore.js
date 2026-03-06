import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const register = async (userData) => {
    return await axios.post(`${API_URL}/register`, userData);
};

export const login = async (loginData) => {
    return await axios.post(`${API_URL}/login`, loginData);
};

export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
    }
};