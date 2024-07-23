// src/apis/axiosAuth.js
import axiosInstance from "./axiosInstance";

const addAuthToken = (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Token added to headers:", token); // Log the token
  } else {
    console.log("No token found in localStorage");
  }

  // Optionally add user details to config or store separately
  const user = {
    name: localStorage.getItem("userName"),
    email: localStorage.getItem("userEmail"),
  };

  config.user = user;

  return config;
};

// Attach the interceptor to the axios instance
axiosInstance.interceptors.request.use(
  addAuthToken,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
