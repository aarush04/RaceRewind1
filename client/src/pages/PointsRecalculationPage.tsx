import React, { useState } from 'react';
import { fetchDriverPointsByYear, fetchConstructorPointsByYear } from '../services/recalculation';

const PointsRecalculationPage: React.FC = () => {
    const [category, setCategory] = useState('drivers'); // 'drivers' or 'constructors'
    const [year, setYear] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [error, setError] = useState('');

    const handleFetchResults = async () => {
        try {
            setError('');
            const data =
                category === 'drivers'
                    ? await fetchDriverPointsByYear(year)
                    : await fetchConstructorPointsByYear(year);
            setResults(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message || 'An error occurred');
            } else {
                setError('An error occurred');
            }
        }
    };

    return (
        <div className="points-recalculation-page">
            <h1>Points Recalculation</h1>
            <label>
                Select Year:
                <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Enter year"
                />
            </label>
            <label>
                Select Category:
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="drivers">Drivers</option>
                    <option value="constructors">Constructors</option>
                </select>
            </label>
            <button onClick={handleFetchResults}>Fetch Points</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table>
                <thead>
                    <tr>
                        {category === 'drivers' ? (
                            <>
                                <th>Driver Name</th>
                                <th>Points</th>
                            </>
                        ) : (
                            <>
                                <th>Constructor Name</th>
                                <th>Points</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {results.map((item, index) => (
                        <tr key={index}>
                            {category === 'drivers' ? (
                                <>
                                    <td>{item.DriverName}</td>
                                    <td>{item.points_2004_system}</td>
                                </>
                            ) : (
                                <>
                                    <td>{item.ConstructorName}</td>
                                    <td>{item.points_pre_2010_system}</td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PointsRecalculationPage;
