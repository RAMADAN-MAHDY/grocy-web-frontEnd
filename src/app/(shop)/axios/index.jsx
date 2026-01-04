import axios from "axios";

const api = axios.create({
  baseURL: "https://iraqi-e-store-api.vercel.app",
  withCredentials: true,
});

export default api;
