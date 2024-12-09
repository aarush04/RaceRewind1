import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import './HypotheticalFastestTimes.css'; // Reuse the same CSS

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            setError('Please fill in both fields.');
            return;
        }

        try {
            const response = await loginUser({ username, password });
            if (response.token) {
                localStorage.setItem('token', response.token);
                navigate('/profile');
            } else {
                setError(response.error || 'Invalid login credentials.');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to login. Please try again later.');
        }
    };

    return (
        <div className="bg-gradient-heavy">
            <header>
                <h1 className="title">Login</h1>
                <p className="subtitle">Access your Race Rewind account.</p>
            </header>
            <div className="hypothetical-fastest-times-container">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input-field"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                />
                <button onClick={handleLogin} className="fetch-button">Login</button>

                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default LoginPage;
