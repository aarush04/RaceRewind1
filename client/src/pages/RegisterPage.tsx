// src/pages/RegisterPage.tsx

import React, { useState } from 'react';
import { registerUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    favorite_driver: '',
    favorite_team: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await registerUser(formData);
    if (result.message === 'User created successfully') {
      navigate('/login');
    } else {
      alert(result.error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" required />
        <input name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" required />
        <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
        <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        <input name="favorite_driver" value={formData.favorite_driver} onChange={handleChange} placeholder="Favorite Driver" />
        <input name="favorite_team" value={formData.favorite_team} onChange={handleChange} placeholder="Favorite Team" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
