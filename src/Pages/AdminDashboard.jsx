// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../API';

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
    nav('/admin-login');
  }

  return (
    <div className="container">
      <div className="nav-bar">
        <h2>Admin Dashboard</h2>
        <button onClick={()=>nav('/admin/employees')}>Manage Employees</button>
        <button onClick={()=>nav('/admin/tasks')}>Assign Tasks</button>
        <button onClick={logout}>Logout</button>
      </div>

      <div>
        <h3>Welcome, Admin!</h3>
        <div>Total Employees: {stats.totalEmployees}</div>
        <div>Total Tasks: {stats.totalTasks}</div>
        <div>Pending Tasks: {stats.pendingTasks}</div>
      </div>
    </div>
  );
}
