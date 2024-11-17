import React from 'react';
import './ResultsTable.css';

interface ResultsTableProps {
    title: string;
    columns: string[];
    data: (string | number)[][];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ title, columns, data }) => {
    return (
        <div className="results-container">
            <h2 className="results-title">{title}</h2>
            <table className="results-table">
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultsTable;