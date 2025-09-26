<<<<<<< HEAD
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export default API;
=======
// src/API.js
import axios from "axios";

// Base URL points to backend without double /api
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default API;
>>>>>>> 73d331d0be1b894eee85872e89902ab0658c9f77
