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

    return (
        <div className="hypothetical-fastest-times-container">
            <h2>Hypothetical Fastest Times</h2>
            <input
                type="number"
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="input-field"
            />
            <input
                type="text"
                placeholder="Driver Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input-field"
            />
            <button onClick={handleFetch} className="fetch-button">
                Fetch Results
            </button>

            {loading && <p className="loading-text">Loading...</p>}
            {error && <p className="error">{error}</p>}

            {results.length > 0 && (
                <table>
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
            )}

            {results.length === 0 && !loading && !error && <p>No results found.</p>}
        </div>
    );
};

export default HypotheticalFastestTimes;
