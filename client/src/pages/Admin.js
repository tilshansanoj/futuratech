import React from 'react';
import axios from 'axios';
import AuthForm from '../components/AuthForm';

const LoginPage = () => {
  const handleLogin = async (data) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', data);
      localStorage.setItem('token', res.data.token);
      sessionStorage.setItem("isLogin", "true");
      sessionStorage.setItem("userRole", "Admin");

  
      window.location.href='/adminDashboard/';
      //alert('Login successful!');
      // redirect or navigate if needed
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div>
      <h2 className="text-center text-2xl mt-6">Administrative Login</h2>
      <AuthForm type="login" onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
