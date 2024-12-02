// client/src/services/services.ts

import axios from 'axios';

// Interfaces for tables

export interface Constructor {
    constructorID: number;
    name: string;
    constructorNationality: string;
}

export interface Driver {
    driverID: number;
    firstName: string;
    lastName: string;
    driverNationality: string;
}

export interface RaceResults {
    resultID: number;
    raceID: number;
    driverID: number;
    constructorID: number;
    qualifyID: number;
    finalPosition: number;
    racePoints: number;
    fastestLap: string;
}

export interface Race {
    raceID: number;
    year: number;
    name: string;
    circuitID: number;
    totalLaps: number;
}

export interface Circuit {
    circuitID: number;
    name: string;
    location: string;
    country: string;
}

export interface QualifyingResults {
    qualifyID: number;
    raceID: number;
    driverID: number;
    constructorID: number;
    q1Time: string;
    q2Time: string;
    q3Time: string;
    gridPosition: number;
}

export interface PitStop {
    pitStopID: number;
    raceID: number;
    driverID: number;
    stopNumber: number;
    stopDuration: string;
}

export interface ConstructorStandings {
    constructorStandingID: number;
    raceID: number;
    constructorID: number;
    constructorPoints: number;
    constructorPosition: number;
}

export interface DriverStandings {
    driverStandingID: number;
    raceID: number;
    driverID: number;
    constructorID: number;
    driverPoints: number;
    driverPosition: number;
}

// HTTP Client setup

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3007';

export const httpClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Service Functions

// Function to fetch Constructors
export async function fetchConstructors(): Promise<Constructor[]> {
    try {
        const response = await httpClient.get('/api/constructors');
        return response.data;
    } catch (error) {
        console.error('Error fetching constructors:', error);
        throw error;
    }
}

// Function to fetch Drivers
export async function fetchDrivers(): Promise<Driver[]> {
    try {
        const response = await httpClient.get('/api/drivers');
        return response.data;
    } catch (error) {
        console.error('Error fetching drivers:', error);
        throw error;
    }
}

// Function to fetch Race Results
export async function fetchRaceResults(raceID: number): Promise<RaceResults[]> {
    try {
        const response = await httpClient.get(`/api/race-results/${raceID}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching race results:', error);
        throw error;
    }
}

// Function to fetch Qualifying Results
export async function fetchQualifyingResults(raceID: number): Promise<QualifyingResults[]> {
    try {
        const response = await httpClient.get(`/api/qualifying-results/${raceID}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching qualifying results:', error);
        throw error;
    }
}

// Function to fetch Pit Stops
export async function fetchPitStops(raceID: number): Promise<PitStop[]> {
    try {
        const response = await httpClient.get(`/api/pitstops/${raceID}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching pit stops:', error);
        throw error;
    }
}

// Function to fetch Driver Standings
export async function fetchDriverStandings(): Promise<DriverStandings[]> {
    try {
        const response = await httpClient.get('/api/driver-standings');
        return response.data;
    } catch (error) {
        console.error('Error fetching driver standings:', error);
        throw error;
    }
}

// Function to fetch Constructor Standings
export async function fetchConstructorStandings(): Promise<ConstructorStandings[]> {
    try {
        const response = await httpClient.get('/api/constructor-standings');
        return response.data;
    } catch (error) {
        console.error('Error fetching constructor standings:', error);
        throw error;
    }
}

// Function to fetch Circuits
export async function fetchCircuits(): Promise<Circuit[]> {
    try {
        const response = await httpClient.get('/api/circuits');
        return response.data;
    } catch (error) {
        console.error('Error fetching circuits:', error);
        throw error;
    }
}

// Function to fetch Average Pit Stop Times for a Grand Prix
export async function fetchAveragePitStopTimesWithMinimum(): Promise<{ name: string; year: number; avg_pitstop_time: number }[]> {
    try {
        const response = await httpClient.get('/api/average-pitstop');
        return response.data.map((item: any) => ({
            name: item.grand_prix_name,
            year: item.year,
            avg_pitstop_time: item.avg_pitstop_time,
        }));
    } catch (error) {
        console.error("Error fetching average pit stop times with minimum:", error);
        throw error;
    }
}

