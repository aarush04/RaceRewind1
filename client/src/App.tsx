// client/src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import PointsRecalculationPage from './pages/PointsRecalculationPage';
import PitStopEvolutionPage from './pages/PitStopEvolutionPage'; // Import the new page

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/points-recalculation" element={<PointsRecalculationPage />} />
                <Route path="/pit-stop-evolution" element={<PitStopEvolutionPage />} /> {/* Add the new route */}
            </Routes>
        </Router>
    );
};

export default App;
