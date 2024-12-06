// src/pages/ProfilePage.tsx

import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      const userProfile = await getUserProfile(token);
      setProfile(userProfile);
    };

    fetchProfile();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h2>Profile</h2>
      {profile && (
        <div>
          <p>First Name: {profile.first_name}</p>
          <p>Last Name: {profile.last_name}</p>
          <p>Username: {profile.username}</p>
          <p>Favorite Driver: {profile.favorite_driver}</p>
          <p>Favorite Team: {profile.favorite_team}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
