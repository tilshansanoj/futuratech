import React from 'react';
import axios from 'axios';
import AuthForm from '../components/AuthForm';

const LoginPage = () => {
  const handleLogin = async (data) => {
    try {
      const res = await axios.post('http://localhost:5000/api/lectures/login', data);
      localStorage.setItem('token', res.data.token);
      sessionStorage.setItem("isLogin", "true");
      sessionStorage.setItem("userRole", "Lecturer");
      sessionStorage.setItem("name", res.data.lectures.name);

  
      window.location.href='/lecturerDashboard/';
      //alert('Login successful!');
      // redirect or navigate if needed
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div>
      <h2 className="text-center text-2xl mt-6">Lecturer Login</h2>
      <AuthForm type="login" onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
