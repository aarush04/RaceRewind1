import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import PointsRecalculationPage from './pages/PointsRecalculationPage';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/points-recalculation" element={<PointsRecalculationPage />} />
            </Routes>
        </Router>
    );
};

export default App;