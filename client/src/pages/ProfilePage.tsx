import React, { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile, deleteUserProfile } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import './HypotheticalFastestTimes.css'; // Reuse the same CSS

const ProfilePage: React.FC = () => {
    const [profile, setProfile] = useState<any>(null);
    const [favoriteDriver, setFavoriteDriver] = useState('');
    const [favoriteTeam, setFavoriteTeam] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchProfile = async () => {
            const userProfile = await getUserProfile(token!);
            if (userProfile.error) {
                alert(userProfile.error);
                navigate('/login');
            } else {
                setProfile(userProfile);
                setFavoriteDriver(userProfile.favorite_driver || '');
                setFavoriteTeam(userProfile.favorite_team || '');
            }
        };

        fetchProfile();
    }, [token, navigate]);

    const handleUpdate = async () => {
        const updatedProfile = await updateUserProfile(token!, {
            ...profile,
            favorite_driver: favoriteDriver,
            favorite_team: favoriteTeam
        });

        if (updatedProfile.error) {
            alert(updatedProfile.error);
        } else {
            alert('Profile updated!');
            setProfile(updatedProfile);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete your account?')) {
            await deleteUserProfile(token!);
            localStorage.removeItem('token');
            navigate('/register');
        }
    };

    return (
        <div className="bg-gradient-heavy">
            <header>
                <h1 className="title">Profile</h1>
            </header>
            {profile && (
                <div className="hypothetical-fastest-times-container">
                    <p>Username: {profile.username}</p>
                    <input
                        type="text"
                        placeholder="Favorite Driver"
                        value={favoriteDriver}
                        onChange={(e) => setFavoriteDriver(e.target.value)}
                        className="input-field"
                    />
                    <input
                        type="text"
                        placeholder="Favorite Team"
                        value={favoriteTeam}
                        onChange={(e) => setFavoriteTeam(e.target.value)}
                        className="input-field"
                    />
                    <button onClick={handleUpdate} className="fetch-button">Update</button>
                    <button onClick={handleDelete} className="fetch-button">Delete Account</button>
                    <button onClick={() => navigate('/')} className="fetch-button">Back to Home</button>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
