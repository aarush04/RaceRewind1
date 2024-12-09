import React, { useState } from 'react';
import './YearInputForm.css';

interface YearInputFormProps {
    onRecalculate: (year: string) => void;
}

const YearInputForm: React.FC<YearInputFormProps> = ({ onRecalculate }) => {
    const [inputYear, setInputYear] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputYear(value);

        // Clear error when user starts typing
        if (error) {
            setError(null);
        }
    };

    const handleSubmit = () => {
        if (!inputYear.trim()) {
            setError('Please enter a year.');
            return;
        }

        if (!/^\d{4}$/.test(inputYear.trim())) {
            setError('Please enter a valid 4-digit year.');
            return;
        }

        // Trigger recalculation if the year is valid
        onRecalculate(inputYear.trim());
    };

    return (
        <div className="input-container">
            <input
                type="text"
                placeholder="Enter a year (e.g., 2004)"
                value={inputYear}
                onChange={handleInputChange}
                className="year-input"
            />
            <button onClick={handleSubmit} className="recalculate-button">
                Recalculate
            </button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default YearInputForm;