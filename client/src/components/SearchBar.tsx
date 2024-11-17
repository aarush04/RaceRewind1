import React, { useState } from 'react';
import { drivers } from '../data/driverData';
import { useNavigate } from 'react-router-dom';
import '../components/SearchBar.css';

interface SearchBarProps {
    onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);

        if (value.length > 0) {
            const matches = drivers
                .filter(driver => driver.name.toLowerCase().includes(value.toLowerCase()))
                .map(driver => driver.name);
            setSuggestions(matches);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (name: string) => {
        navigate(`/driver/${name}`);
        setInput('');
        setSuggestions([]);
    };

    return (
        <div className="relative w-full max-w-md search-bar-container">
            <input
                type="text"
                placeholder="Search for a driver..."
                value={input}
                onChange={handleInputChange}
                className="px-4 py-2 border rounded-lg w-full"
            />
            {suggestions.length > 0 && (
                <ul className="absolute left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-200 text-black"
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
