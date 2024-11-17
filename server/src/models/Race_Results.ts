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
