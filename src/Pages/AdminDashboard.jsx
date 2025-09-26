// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../API';
import './AdminDashboard.css';

export default function AdminDashboard(){
  const nav = useNavigate();
  const [stats, setStats] = useState({ totalEmployees:0, totalTasks:0, pendingTasks:0 });

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats(){
    try {
      const res = await API.get('/stats');
      setStats(res.data);
    } catch (e) {
      console.error(e);
    }
  }

  function logout(){
    localStorage.removeItem('admin');
    nav('/');
  }

  return (
    <div className="admin-bg">
      <div className="admin-card">
        <div className="admin-actions">
          <button className="pill btn-primary" onClick={()=>nav('/admin/employees')}>Manage Employees</button>
          <button className="pill btn-accent" onClick={()=>nav('/admin/tasks')}>Assign Tasks</button>
          <button className="pill btn-danger" onClick={logout}>Logout</button>
        </div>

        <div className="admin-hero">
          <h2>Welcome, Admin!</h2>
          <p>Manage your employees and assign tasks efficiently</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.totalEmployees}</div>
            <div className="stat-label">Total Employees</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.totalTasks}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.pendingTasks}</div>
            <div className="stat-label">Pending Tasks</div>
          </div>
        </div>
      </div>
    </div>
  );
}
