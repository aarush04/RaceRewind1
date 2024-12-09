import React, { useState } from 'react';
import { fetchHypotheticalFastestTimes } from '../services/services';
import './HypotheticalFastestTimes.css';

const HypotheticalFastestTimes: React.FC = () => {
    const [year, setYear] = useState<number | ''>('');
    const [lastName, setLastName] = useState<string>('');
    const [results, setResults] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleFetch = async () => {
        if (!year || !lastName) {
            
            setError('Please provide both year and driver last name.');
            return;
        }

        setLoading(true);
        setError(null);
        setResults([]); // Clear previous results when fetching new data
        try {
            const data = await fetchHypotheticalFastestTimes(Number(year), lastName);
            setResults(data);
        } catch (err: any) {
            console.error("Error fetching data:", err);
            setError(err.message || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleFetch();
        }
    };

    return (
        <div className="bg-gradient-heavy">
            <header>
                <h1 className="title">Hypothetical Fastest Times</h1>
                <p className="subtitle" style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Fetch hypothetical fastest times by driver for 2018 or 2019.</p>
            </header>
            <div className="hypothetical-fastest-times-container">
                <input
                    type="text"
                    placeholder="Driver Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="input-field"
                    style={{ color: 'black' }}
                />
                <input
                    type="number"
                    placeholder="Year"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    onKeyPress={handleKeyPress}
                    className="input-field"
                    style={{ color: 'black' }}
                />
                <button onClick={handleFetch} className="fetch-button">Fetch Results</button>

                {loading && <p className="loading-message">Loading...</p>}
                {error && <p className="error-message" style={{ textAlign: 'center' }}>{error}</p>}

                {results.length > 0 && !loading && (
                    <div className="results-flex-container">
                        <table className="hypothetical-fastest-times-table">
                            <thead>
                                <tr>
                                    <th>Year</th>
                                    <th>Race</th>
                                    <th>Driver</th>
                                    <th>Q1 Time</th>
                                    <th>Q2 Time</th>
                                    <th>Q3 Time</th>
                                    <th>Hypothetical Fastest Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.year}</td>
                                        <td>{row.race}</td>
                                        <td>{row.driverName}</td>
                                        <td>{row.qualifyingTimeQ1 ?? '-'}</td>
                                        <td>{row.qualifyingTimeQ2 ?? '-'}</td>
                                        <td>{row.qualifyingTimeQ3 ?? '-'}</td>
                                        <td>{row.hypotheticalFastestTime ?? '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {results.length === 0 && !loading && !error && (
                    <p className="no-results-message"></p>
                )}
            </div>
            <footer className="footer">
                © 2024 Race Rewind. All rights reserved.
            </footer>
        </div>
    );
};

export default HypotheticalFastestTimes;
