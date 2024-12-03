import React, { useEffect, useState } from 'react';
import { fetchAveragePitStopTimesWithMinimum } from '../services/averagePitStopService';
import './PitStopEvolutionPage.css';

interface PitStopData {
    name: string;
    year: number;
    avg_pitstop_time: number;
}

const PitStopsPage: React.FC = () => {
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
        return <div className="loading-message">Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="bg-gradient-heavy">
            <header>
                <h1 className="title">Pit Stop Evolution</h1>
                <p className="subtitle" style={{ fontSize: '1.8rem', marginBottom: '20px' }}>This feature displays best average pit stop time per track and the year in which this best average occured</p>
            </header>
            <div className="pitstop-evolution-container">
                <h2 style={{ marginTop: '0' }}>Grand Prix with Average Pit Stop Times and Minimum Averages</h2>
                <table className="pitstop-evolution-table">
                    <thead>
                        <tr>
                            <th style={{ color: 'black' }}>Grand Prix</th>
                            <th style={{ color: 'black' }}>Year</th>
                            <th style={{ color: 'black' }}>Average Pit Stop (seconds)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pitStopData.map((entry, index) => (
                            <tr key={index}>
                                <td style={{ color: 'black' }}>{entry.name}</td>
                                <td style={{ color: 'black' }}>{entry.year}</td>
                                <td style={{ color: 'black' }}>{entry.avg_pitstop_time.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <footer className="footer">
                ©️ 2024 Race Rewind. All rights reserved.
            </footer>
        </div>
    );
};

export default PitStopsPage;