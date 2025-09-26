import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API";
import Header from "./Header";
import Footer from "./Footer";
import "./EmployeeLogin.css"

export default function EmployeeLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const res = await API.post("/employee/login", { email, password });

      // Store employee info for dashboard
      localStorage.setItem("employee", JSON.stringify(res.data.employee));

      // Navigate to dashboard
      nav("/employee/dashboard");
    } catch (error) {
      setErr(error?.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header currentUser={null} />
      <div className="container">
        <h2>Employee Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            {err && <div style={{ color: "red", marginTop: "5px" }}>{err}</div>}
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
