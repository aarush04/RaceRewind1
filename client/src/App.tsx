import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import PointsRecalculationPage from './pages/PointsRecalculationPage';
import PitStopEvolutionPage from './pages/PitStopEvolutionPage';
import QualifyingResultsPage from './pages/QualifyingResults';
import HypotheticalFastestTimes from './pages/HypotheticalFastestTimes';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/points-recalculation" element={<PointsRecalculationPage />} />
                <Route path="/pit-stop-evolution" element={<PitStopEvolutionPage />} />
                <Route path="/quali-consistency" element={<QualifyingResultsPage />} /> 
                <Route path="/race-vs-quali" element={<HypotheticalFastestTimes />} /> 
                
            </Routes>
        </Router>
    );
};

export default App;


WITH fastest_sector_times AS (
    SELECT
        raceID,
        driverID,
        CONCAT(
            LPAD(FLOOR(SUM(Time) / 60), 2, '0'), ':',
            LPAD(FLOOR(SUM(Time) % 60), 2, '0'), '.',
            LPAD(ROUND((SUM(Time) - FLOOR(SUM(Time))) * 10, 1), 1, '0')
        ) AS hypothetical_fastest_time
    FROM sectors
    GROUP BY raceID, driverID
),
best_qualifying_time AS (
    SELECT
        qr.raceID,
        qr.driverID,
        MIN(Q1Time) AS Q1Time,
        MIN(Q2Time) AS Q2Time,
        MIN(Q3Time) AS Q3Time
    FROM Qualifying_Results qr
    GROUP BY qr.raceID, qr.driverID
),
combined_data AS (
    SELECT
        r.Year,
        r.Name AS Race,
        CONCAT(d.FirstName, ' ', d.LastName) AS Driver_Name,
        bq.Q1Time AS Qualifying_Time_Q1,
        bq.Q2Time AS Qualifying_Time_Q2,
        bq.Q3Time AS Qualifying_Time_Q3,
        f.hypothetical_fastest_time
    FROM fastest_sector_times f
    JOIN best_qualifying_time bq ON f.raceID = bq.raceID AND f.driverID = bq.driverID
    JOIN Race r ON f.raceID = r.raceID
    JOIN Driver d ON f.driverID = d.driverID
    WHERE r.Year = '2018' AND d.LastName LIKE CONCAT('%', 'Hamilton', '%')
)
SELECT 
    Year,
    Race,
    Driver_Name,
    Qualifying_Time_Q1,
    Qualifying_Time_Q2,
    Qualifying_Time_Q3,
    hypothetical_fastest_time AS Hypothetical_Fastest_Time
FROM combined_data;