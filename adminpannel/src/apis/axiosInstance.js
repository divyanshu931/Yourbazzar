// src/apis/axiosInstance.js
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // Fallback to localhost if env variable is not set

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
