import axiosInstance from "./axiosInstance";

const addAuthToken = (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
    console.log("Token added to headers:", token); // Log the token
  } else {
    console.log("No token found in localStorage");
  }
  return config;
};

export const axiosWithAuth = (config) => {
  return axiosInstance(addAuthToken(config));
};
