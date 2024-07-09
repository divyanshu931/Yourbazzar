// axiosWithAuth.js

import axiosInstance from "./axiosInstance";

const addAuthToken = (config) => {
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
    console.log("Token added to headers:", token); // Log the token
  } else {
    console.log("No token found in localStorage");
  }

  // Add user details to config or store separately as needed
  config.user = { name, email };

  return config;
};

export const axiosWithAuth = (config = {}) => {
  return axiosInstance.interceptors.request.use(addAuthToken(config), (error) => {
    return Promise.reject(error);
  });
};
