import React, { useState } from 'react';

const AuthForm = ({ type, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={submitForm} className="max-w-md mx-auto mt-10 p-6 shadow-md border rounded">
      {type === 'register' && (
        <div className="mb-4">
          <label>Name:</label>
          <input name="name" type="text" onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>
      )}
      <div className="mb-4">
        <label>Username:</label>
        <input name="email" type="text" onChange={handleChange} required className="w-full p-2 border rounded" />
      </div>
      <div className="mb-4">
        <label>Password:</label>
        <input name="password" type="password" onChange={handleChange} required className="w-full p-2 border rounded" />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {type === 'login' ? 'Login' : 'Register'}
      </button>
    </form>
  );
};

export default AuthForm;
