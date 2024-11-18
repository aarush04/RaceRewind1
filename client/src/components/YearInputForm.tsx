import React, { useState } from 'react';
import './YearInputForm.css';

interface YearInputFormProps {
    onRecalculate: (year: string) => void;
}

const YearInputForm: React.FC<YearInputFormProps> = ({ onRecalculate }) => {
    const [inputYear, setInputYear] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputYear(e.target.value);
    };

    const handleSubmit = () => {
        if (inputYear) {
            onRecalculate(inputYear);
        }
    };

    return (
        <div className="input-container">
            <input
                type="text"
                placeholder="Enter a year (e.g., 2005)"
                value={inputYear}
                onChange={handleInputChange}
                className="year-input"
            />
            <button onClick={handleSubmit} className="recalculate-button">
                Recalculate
            </button>
        </div>
    );
};

export default YearInputForm;