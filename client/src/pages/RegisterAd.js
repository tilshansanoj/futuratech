import React from 'react';
import axios from 'axios';
import AuthForm from '../components/AuthForm';

const RegisterPage = () => {
  const handleRegister = async (data) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', data);
      alert('Registration successful!');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div>
      <h2 className="text-center text-2xl mt-6">Register</h2>
      <AuthForm type="register" onSubmit={handleRegister} />
    </div>
  );
};

export default RegisterPage;
