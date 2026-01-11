// api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.1.135:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Create a setter to attach token manually
export const attachAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

export default API;
