// client/src/components/FastestPitStopTable.tsx

import React, { useEffect, useState } from 'react';
import { fetchFastestPitStopTimes } from '../services/pitStopService';
import './FastestPitStopTable.css';

interface PitStopData {
    grand_prix_name: string;
    year: number;
    fastest_pitstop_time: number;
}

const FastestPitStopTable: React.FC = () => {
    const [pitStopData, setPitStopData] = useState<PitStopData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getPitStopData = async () => {
            try {
                const data = await fetchFastestPitStopTimes();
                setPitStopData(data);
                setError(null);
            } catch (error) {
                setError("Failed to load pit stop data");
            } finally {
                setLoading(false);
            }
        };

        getPitStopData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="pitstop-table-container">
            <h2>Fastest Pit Stop Times in Grand Prix History</h2>
            <table className="pitstop-table">
                <thead>
                    <tr>
                        <th>Grand Prix</th>
                        <th>Year</th>
                        <th>Fastest Pit Stop (seconds)</th>
                    </tr>
                </thead>
                <tbody>
                    {pitStopData.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.grand_prix_name}</td>
                            <td>{entry.year}</td>
                            <td>{entry.fastest_pitstop_time.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FastestPitStopTable;
