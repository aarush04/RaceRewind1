import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import './HypotheticalFastestTimes.css'; // Reuse the same CSS

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        favorite_driver: '',
        favorite_team: ''
    });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!formData.first_name || !formData.last_name || !formData.username || !formData.password) {
            setError('Please fill in all required fields.');
            return;
        }

        try {
            const response = await registerUser(formData);
            if (response.message === 'User created successfully') {
                navigate('/login');
            } else {
                setError(response.error || 'Failed to register.');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to register. Please try again later.');
        }
    };

    return (
        <div className="bg-gradient-heavy">
            <header>
                <h1 className="title">Register</h1>
                <p className="subtitle">Create your Race Rewind account.</p>
            </header>
            <div className="hypothetical-fastest-times-container">
                <input
                    type="text"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="input-field"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Favorite Driver (Optional)"
                    value={formData.favorite_driver}
                    onChange={(e) => setFormData({ ...formData, favorite_driver: e.target.value })}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Favorite Team (Optional)"
                    value={formData.favorite_team}
                    onChange={(e) => setFormData({ ...formData, favorite_team: e.target.value })}
                    className="input-field"
                />
                <button onClick={handleRegister} className="fetch-button">Register</button>

                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default RegisterPage;
