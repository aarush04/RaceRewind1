// src/services/recalculation.ts

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

export const fetchDriverPointsByYear = async (year: string) => {
    const response = await fetch(`${API_BASE_URL}/api/recalculation/driver-points?year=${year}`);
    if (!response.ok) {
        throw new Error('Failed to fetch driver points');
    }
    return response.json();
};

export const fetchConstructorPointsByYear = async (year: string) => {
    const response = await fetch(`${API_BASE_URL}/api/recalculation/constructor-points?year=${year}`);
    if (!response.ok) {
        throw new Error('Failed to fetch constructor points');
    }
    return response.json();
};
