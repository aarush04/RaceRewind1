import React from 'react';
import { useParams } from 'react-router-dom';
import { drivers } from '../data/driverData';

const DriverDetailPage: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const driver = drivers.find(driver => driver.name.toLowerCase() === name?.toLowerCase());

    if (!driver) {
        return (
            <div className="container mx-auto p-4 text-center">
                <h1 className="text-3xl font-bold mb-4">Driver Not Found</h1>
                <p>The driver you searched for does not exist in our database.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 text-center">
            <img src={driver.image} alt={driver.name} className="w-40 h-40 object-cover rounded-full mx-auto mb-4" />
            <h1 className="text-3xl font-bold">{driver.name}</h1>
            <p className="text-xl">{driver.team}</p>
            <p className="text-gray-500">{driver.country}</p>
        </div>
    );
};

export default DriverDetailPage;
