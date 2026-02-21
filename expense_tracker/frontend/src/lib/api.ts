import axios from "axios";

const api = axios.create({
  baseURL: "https://full-stack-projects-tkpa.vercel.app/api",
  withCredentials: true,
});

export default api;