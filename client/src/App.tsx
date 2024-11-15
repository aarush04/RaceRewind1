import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import PointsRecalculationPage from './pages/PointsRecalculationPage';
import DriverDetailPage from './pages/DriverDetailPage';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/points-recalculation" element={<PointsRecalculationPage />} />
                <Route path="/driver/:name" element={<DriverDetailPage />} />
            </Routes>
        </Router>
    );
};

export default App;
