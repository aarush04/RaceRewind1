import React, { useState } from 'react';

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

    return (
        <div style={{ padding: '20px' }}>
            <h1>Points Recalculation</h1>
            <input
                type="text"
                placeholder="Enter Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                style={{ marginRight: '10px' }}
            />
            <button onClick={fetchRecalculatedPoints}>Fetch Points</button>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {results && (
                <div>
                    <h2>Driver Standings</h2>
                    <ul>
                        {results.drivers.map((driver: any) => (
                            <li key={driver.driverID}>
                                {driver.DriverName}: {driver.points} points
                            </li>
                        ))}
                    </ul>

                    <h2>Constructor Standings</h2>
                    <ul>
                        {results.constructors.map((constructor: any) => (
                            <li key={constructor.constructorID}>
                                {constructor.ConstructorName}: {constructor.Updated_Points} points
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PointsRecalculationPage;
