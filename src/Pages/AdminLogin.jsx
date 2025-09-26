
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
   
    
  
       
        <div className='form-group'>
          <div className='btnform'>
        <button className="btn" type="submit">Login as Admin</button>
        <button className="btn btn-secondary" type="button" onClick={()=>nav('/employee-login')}>Employee Login</button>
        {err && <div style={{color:'red'}}>{err}</div>}
        </div>
        </div>
      
    <Footer />
    </>
  );
}
