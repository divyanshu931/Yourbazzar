import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://yourbazzar-backend.onrender.com", // Base URL for your API
});

export default axiosInstance;
