// client/src/services/averagePitStopService.ts

import { httpClient } from "./services";

export async function fetchAveragePitStopTimesWithMinimum() {
    try {
        const response = await httpClient.get('/api/average-pitstop');
        return response.data;
    } catch (error) {
        console.error("Error fetching average pit stop times with minimum:", error);
        throw error;
    }
}
