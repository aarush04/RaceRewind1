import axios from "axios";

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
    fastestLap: string; // Assuming TIME format as a string
}

export interface Race {
    raceID: number;
    year: number;
    name: string;
    circuitID: number;
    totalLaps: number;
}


  

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3007';

export const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPitStopAverages = async (grandPrixName: string) => {
    try {
        const response = await axios.get('/api/pitstop-averages', {
            params: { grandPrixName },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching pit stop averages:', error);
        throw error;
    }
};