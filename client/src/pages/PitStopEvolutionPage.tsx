// client/src/pages/PitStopEvolutionPage.tsx

import React, { useEffect, useState } from 'react';
import { fetchAveragePitStopTimesWithMinimum } from '../services/averagePitStopService';
import './PitStopEvolutionPage.css';

interface PitStopData {
    name: string;
    year: number;
    avg_pitstop_time: number;
}

const PitStopEvolutionPage: React.FC = () => {
    const [pitStopData, setPitStopData] = useState<PitStopData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getPitStopData = async () => {
            try {
                const data = await fetchAveragePitStopTimesWithMinimum();
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
        <div className="pitstop-evolution-container">
            <h2>Grand Prix with Average Pit Stop Times and Minimum Averages</h2>
            <table className="pitstop-evolution-table">
                <thead>
                    <tr>
                        <th>Grand Prix</th>
                        <th>Year</th>
                        <th>Average Pit Stop (seconds)</th>
                    </tr>
                </thead>
                <tbody>
                    {pitStopData.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.name}</td>
                            <td>{entry.year}</td>
                            <td>{entry.avg_pitstop_time.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PitStopEvolutionPage;
