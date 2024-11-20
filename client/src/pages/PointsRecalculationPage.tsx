import React, { useState } from 'react';
import './PointsRecalculationPage.css';

const PointsRecalculationPage: React.FC = () => {
    const [year, setYear] = useState('');
    const [results, setResults] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchRecalculatedPoints = async () => {
        if (!year || isNaN(Number(year))) {
            setError('Please enter a valid year.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:3007/api/points/recalculation?year=${year}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            setResults(data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            fetchRecalculatedPoints();
        }
    };

    return (
        <div className="bg-gradient-heavy">
            <header>
                <h1 className="title">Points Recalculation</h1>
                <p className="subtitle" style={{ fontSize: '1.5rem' }}>This feature allows you to recalculate championship points based on the current scoring rules.</p>
            </header>
            <div className="search-container" style={{ marginTop: '20px' }}>
                <input
                    type="text"
                    placeholder="Enter Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="year-input"
                />
                <button onClick={fetchRecalculatedPoints} className="fetch-button">Fetch Points</button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {results && (
                <div className="results-flex-container">
                    <div>
                        <h2>Driver Standings</h2>
                        <ul>
                            {results.drivers.map((driver: any) => (
                                <li key={driver.driverID}>
                                    {driver.DriverName}: {driver.points} points
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2>Constructor Standings</h2>
                        <ul>
                            {results.constructors.map((constructor: any) => (
                                <li key={constructor.constructorID}>
                                    {constructor.ConstructorName}: {constructor.Updated_Points} points
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            <footer className="footer">
                © 2024 Race Rewind. All rights reserved.
            </footer>
        </div>
    );
};

export default PointsRecalculationPage;
