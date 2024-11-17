import React, { useState } from 'react';
import YearInputForm from '../components/YearInputForm';
import ResultsTable from '../components/ResultsTable';
import './PointsRecalculationPage.css';

const PointsRecalculationPage: React.FC = () => {
    const [year, setYear] = useState('');
    const [driverResults, setDriverResults] = useState<Array<{ position: number; driver: string; points: number }>>([]);
    const [constructorResults, setConstructorResults] = useState<Array<{ position: number; constructor: string; points: number }>>([]);

    const handleRecalculate = (inputYear: string) => {
        setYear(inputYear);

        // Mock data to simulate functionality
        const mockDriverResults = Array.from({ length: 20 }, (_, i) => ({
            position: i + 1,
            driver: `Driver ${i + 1}`,
            points: Math.floor(Math.random() * 300),
        }));

        const mockConstructorResults = Array.from({ length: 10 }, (_, i) => ({
            position: i + 1,
            constructor: `Constructor ${i + 1}`,
            points: Math.floor(Math.random() * 500),
        }));

        setDriverResults(mockDriverResults);
        setConstructorResults(mockConstructorResults);
    };

    return (
        <div className="bg-gradient-heavy">
            <h1 className="title">
                {"What If Champions: Reimagining Titles".split("").map((letter, index) => (
                    <span key={index} style={{ "--index": index } as React.CSSProperties}>
                        {letter}
                    </span>
                ))}
            </h1>
            <p className="subtitle">
                This feature allows you to recalculate championship points based on the current scoring rules. Enter a year
                below to get started.
            </p>

            <YearInputForm onRecalculate={handleRecalculate} />

            {year && (
                <div className="results-flex-container">
                    <ResultsTable
                        title={`Recalculated Driver Standings for ${year}`}
                        columns={["Position", "Driver", "Points"]}
                        data={driverResults.map((result) => [result.position, result.driver, result.points])}
                    />
                    <ResultsTable
                        title={`Recalculated Constructor Standings for ${year}`}
                        columns={["Position", "Constructor", "Points"]}
                        data={constructorResults.map((result) => [result.position, result.constructor, result.points])}
                    />
                </div>
            )}

            <footer className="footer">
                © 2024 Race Rewind. All rights reserved.
            </footer>
        </div>
    );
};

export default PointsRecalculationPage;
