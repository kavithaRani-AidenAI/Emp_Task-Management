
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../API';
import './AdminLogin.css';
import Footer from './Footer';
import Header from './Header';

export default function AdminLogin(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    setErr('');
    if (!username || !password) {
      setErr('Please enter both username and password');
      return;
    }
    setLoading(true);
    try {
      const res = await API.post('/admin/login', { username, password });
      if (res?.data?.success && res?.data?.admin) {
        localStorage.setItem('admin', JSON.stringify(res.data.admin));
        nav('/admin-dashboard');
      } else {
        setErr('Login failed');
      }
    } catch (error){
      setErr(error?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
   <Header currentUser={null} /> 
<<<<<<< HEAD
    <div className="container">
      <div id="adminLogin" className="page active">
        <div className='header'>
          {/* <h1>Employee Task Management System</h1> */}
          <h2>Admin Login</h2>
       
       </div>
      <form onSubmit={submit}>
         <div className="login-form">
        <div className="form-group">
          <label>Username</label>
          <input value={username} onChange={e=>setUsername(e.target.value)} required disabled={loading} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input value={password} type="password" onChange={e=>setPassword(e.target.value)} required disabled={loading} />
        </div >
        <div className='form-group'>
        <button className="btn" type="submit" disabled={!username || !password || loading}>{loading ? 'Logging in...' : 'Login as Admin'}</button>
        <button className="btn btn-secondary" type="button" onClick={()=>nav('/employee-login')} disabled={loading}>Employee Login</button>
=======
   
    
  
       
        <div className='form-group'>
          <div className='btnform'>
        <button className="btn" type="submit">Login as Admin</button>
        <button className="btn btn-secondary" type="button" onClick={()=>nav('/employee-login')}>Employee Login</button>
>>>>>>> 73d331d0be1b894eee85872e89902ab0658c9f77
        {err && <div style={{color:'red'}}>{err}</div>}
        </div>
        </div>
      
    <Footer />
    </>
  );
}
