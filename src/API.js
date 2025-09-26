// src/API.js
import axios from "axios";

// Base URL points to backend without double /api
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default API;
