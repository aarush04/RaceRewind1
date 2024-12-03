import React, { useState } from 'react';
import { fetchQualifyingResultsWithMetrics } from '../services/services';
import './QualifyingResults.css';

const QualifyingResults: React.FC = () => {
    const [lastName, setLastName] = useState('');
    const [year, setYear] = useState<number | ''>('');
    const [results, setResults] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFetch = async () => {
        if (!lastName || !year) {
            setError('Please provide both driver last name and year.');
            return;
        }

        setLoading(true);
        setError(null);
        setResults([]); // Clear previous results when fetching new data
        try {
            const data = await fetchQualifyingResultsWithMetrics(lastName, Number(year));
            setResults(data);
        } catch (err: any) {
            console.error("Error fetching qualifying results:", err);
            setError(err.message || 'An error occurred while fetching qualifying results.');
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
                <h1 className="title">Qualifying Results</h1>
                <p className="subtitle" style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Analyze results and consistency for a driver in a race year</p>
            </header>
            <div className="qualifying-results-container">
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
                {error && <p className="error-message">{error}</p>}

                {results.length > 0 && !loading && (
                    <div className="results-flex-container">
                        <table className="qualifying-results-table">
                            <thead>
                                <tr>
                                    <th>Race Name</th>
                                    <th>Qualifying Position</th>
                                    <th>Finish Position</th>
                                    <th>Positions Gained/Lost</th>
                                    <th>StdDev (Consistency)</th>
                                    <th>Avg (Consistency)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.raceName || '-'}</td>
                                        <td>{row.qualifyingPosition !== null ? row.qualifyingPosition : '-'}</td>
                                        <td>{row.finishPosition !== null ? row.finishPosition : '-'}</td>
                                        <td>{row.positionsGainedLost !== null ? row.positionsGainedLost : '-'}</td>
                                        <td>{row.stdDevPositionsGainedLost !== null ? row.stdDevPositionsGainedLost : '-'}</td>
                                        <td>{row.avgPositionsGainedLost !== null ? row.avgPositionsGainedLost : '-'}</td>
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

export default QualifyingResults;
