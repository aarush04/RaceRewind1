import React, { useState } from 'react';
import YearInputForm from '../components/YearInputForm';
import ResultsTable from '../components/ResultsTable';
import './PointsRecalculationPage.css';

const PointsRecalculationPage: React.FC = () => {
    const [year, setYear] = useState('');
    const [driverResults, setDriverResults] = useState<Array<{ position: number; driver: string; points: number }>>([]);
    const [constructorResults, setConstructorResults] = useState<Array<{ position: number; constructor: string; points: number }>>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRecalculatedPoints = async (inputYear: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/points-recalculation?year=${inputYear}`);
            if (!response.ok) {
                throw new Error('Failed to fetch recalculated points');
            }

            const data = await response.json();

            // Format driver results
            setDriverResults(
                data.drivers.map((driver: any, index: number) => ({
                    position: index + 1,
                    driver: driver.DriverName,
                    points: driver.points,
                }))
            );

            // Format constructor results
            setConstructorResults(
                data.constructors.map((constructor: any, index: number) => ({
                    position: index + 1,
                    constructor: constructor.ConstructorName,
                    points: constructor.points_pre_2010_system,
                }))
            );
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRecalculate = (inputYear: string) => {
        setYear(inputYear);
        fetchRecalculatedPoints(inputYear);
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

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            {year && !loading && !error && (
                <div className="results-flex-container">
                    {/* Drivers Table */}
                    <ResultsTable
                        title={`Recalculated Driver Standings for ${year}`}
                        columns={["Position", "Driver", "Points"]}
                        data={driverResults.map((result) => [result.position, result.driver, result.points])}
                    />

                    {/* Constructors Table */}
                    <ResultsTable
                        title={`Recalculated Constructor Standings for ${year}`}
                        columns={["Position", "Constructor", "Points"]}
                        data={constructorResults.map((result) => [result.position, result.constructor, result.points])}
                    />
                </div>
            )}
        </div>
    );
};

export default PointsRecalculationPage;