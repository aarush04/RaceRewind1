// client/src/pages/Homepage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import FeatureBox from '../components/FeatureBox';
import './Homepage.css';

const Homepage: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // Check if user is logged in

    const handleSearch = (name: string) => {
        if (name) {
            navigate(`/driver/${name}`);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="bg-gradient-heavy">
            <header>
                <nav className="navbar">
                    {!token ? (
                        <>
                            <button className="nav-button" onClick={() => navigate('/login')}>Login</button>
                            <button className="nav-button" onClick={() => navigate('/register')}>Register</button>
                        </>
                    ) : (
                        <>
                            <button className="nav-button" onClick={() => navigate('/profile')}>Profile</button>
                            <button className="nav-button" onClick={handleLogout}>Logout</button>
                        </>
                    )}
                </nav>

                <h1 className="title">
                    {"Race Rewind".split("").map((letter, index) => (
                        <span key={index} style={{ "--index": index } as React.CSSProperties}>
                            {letter}
                        </span>
                    ))}
                </h1>
                <p className="tagline">Your ultimate F1 analysis hub</p>
            </header>

            <div className="search-container">
                <SearchBar onSearch={handleSearch} />
            </div>

            <main className="features-grid">
                <FeatureBox title="What If Champions: Reimagining Titles" link="/points-recalculation" />
                <FeatureBox title="The Pit Stop Evolutionary Path" link="/pit-stop-evolution" />
                <FeatureBox title="Quali Consistency Quotient" link="/quali-consistency" />
                <FeatureBox title="Race vs. Qualifying: The Performance Mirror" link="/race-vs-quali" />
            </main>

            <footer className="footer">
                © 2024 Race Rewind. All rights reserved.
            </footer>
        </div>
    );
};

export default Homepage;
