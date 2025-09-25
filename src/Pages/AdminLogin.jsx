
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
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    setErr('');
    try {
      const res = await API.post('/api/admin/login', { username, password });
      // store simple token (server returns admin object or token)
      localStorage.setItem('admin', JSON.stringify(res.data));
      nav('/admin/dashboard');
    } catch (error){
      setErr(error?.response?.data?.message || 'Login failed');
    }
  }

  return (
    <>
   <Header currentUser={null} /> 
    <div className="container">
      <div id="adminLogin" class="page active">
        <div className='header'>
          {/* <h1>Employee Task Management System</h1> */}
          <h2>Admin Login</h2>
       
       </div>
      <form onSubmit={submit}>
         <div className="login-form">
        <div className="form-group">
          <label>Username</label>
          <input value={username} onChange={e=>setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input value={password} type="password" onChange={e=>setPassword(e.target.value)} />
        </div >
        <div className='form-group'>
        <button className="btn" type="submit">Login as Admin</button>
        <button className="btn btn-secondary" type="button" onClick={()=>nav('/employee-login')}>Employee Login</button>
        {err && <div style={{color:'red'}}>{err}</div>}
        </div>
        </div>
      </form>
    </div>
    </div>
    <Footer />
    </>
  );
}
