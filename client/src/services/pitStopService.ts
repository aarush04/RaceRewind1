// client/src/services/pitStopService.ts

import { httpClient } from "./services";

export async function fetchFastestPitStopTimes() {
    try {
        const response = await httpClient.get('/api/fastest-pitstops');
        return response.data;
    } catch (error) {
        console.error("Error fetching fastest pit stop times:", error);
        throw error;
    }
}
