// App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import PointsRecalculationPage from './pages/PointsRecalculationPage';
import PitStopEvolutionPage from './pages/PitStopEvolutionPage';
import QualifyingResultsPage from './pages/QualifyingResults';
import HypotheticalFastestTimes from './pages/HypotheticalFastestTimes';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/points-recalculation" element={<PointsRecalculationPage />} />
                <Route path="/pit-stop-evolution" element={<PitStopEvolutionPage />} />
                <Route path="/quali-consistency" element={<QualifyingResultsPage />} />
                <Route path="/race-vs-quali" element={<HypotheticalFastestTimes />} />

                {/* Auth Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                {/* Protected Routes */}
                <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
};

export default App;
