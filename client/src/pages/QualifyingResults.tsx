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

    return (
        <div className="qualifying-results-container">
            <h2>Qualifying Results</h2>
            <input
                type="text"
                placeholder="Driver Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
            />
            <button onClick={handleFetch}>Fetch Results</button>

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            {results.length > 0 && !loading && (
                <table>
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
            )}

            {results.length === 0 && !loading && !error && (
                <p>No results found for the provided query.</p>
            )}
        </div>
    );
};

export default QualifyingResults;
