import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import FeatureBox from '../components/FeatureBox';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleSearch = (name: string) => {
        if (name) {
            navigate(`/driver/${name}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <h1 className="text-5xl font-bold mb-6 text-center">Race Rewind</h1>
            <SearchBar onSearch={handleSearch} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 w-full max-w-4xl">
                <FeatureBox title="What If Champions: Reimagining Titles" link="/points-recalculation" />
                <FeatureBox title="The Pit Stop Evolutionary Path" link="/pit-stop-evolution" />
                <FeatureBox title="Quali Consistency Quotient" link="/quali-consistency" />
                <FeatureBox title="Race vs. Qualifying: The Performance Mirror" link="/race-vs-quali" />
            </div>
        </div>
    );
};

export default HomePage;
