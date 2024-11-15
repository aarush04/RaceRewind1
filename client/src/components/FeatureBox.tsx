import React from 'react';
import { Link } from 'react-router-dom';

interface FeatureBoxProps {
    title: string;
    link: string;
}

const FeatureBox: React.FC<FeatureBoxProps> = ({ title, link }) => {
    return (
        <Link to={link} className="p-6 border rounded-lg shadow hover:shadow-lg transition text-left">
            <h2 className="text-2xl font-semibold">{title}</h2>
        </Link>
    );
};

export default FeatureBox;
