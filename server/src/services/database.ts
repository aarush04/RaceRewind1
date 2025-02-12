import { pool } from './connection';
import { RowDataPacket } from 'mysql2';


// server/src/services/database.ts

export async function getAveragePitStopTimesWithMinimum(): Promise<any[]> {
    const sqlQuery = `
        SELECT 
            r.Name AS grand_prix_name,
            r.Year AS year,
            AVG(CAST(ps.StopDuration AS FLOAT)) AS avg_pitstop_time
        FROM 
            Race r
        JOIN 
            Pit_Stops ps ON r.raceID = ps.raceID
        GROUP BY 
            r.Name, r.Year
        HAVING 
            AVG(CAST(ps.StopDuration AS FLOAT)) = (
                SELECT 
                    MIN(avg_pitstop_time)
                FROM (
                    SELECT 
                        r.Name,
                        AVG(CAST(ps.StopDuration AS FLOAT)) AS avg_pitstop_time
                    FROM 
                        Race r
                    JOIN 
                        Pit_Stops ps ON r.raceID = ps.raceID
                    GROUP BY 
                        r.Name, r.Year
                ) AS subquery
                WHERE 
                    subquery.Name = r.Name
            )
        ORDER BY 
            r.Name, r.Year
        LIMIT 100;
    `;

    const [rows] = await pool.query<RowDataPacket[]>(sqlQuery);
    return rows.map(row => ({
        name: row.grand_prix_name,
        year: row.year,
        avg_pitstop_time: row.avg_pitstop_time,
    }));
}



export async function getFastestPitStopTimes(): Promise<any[]> {
    const sqlQuery = `
        SELECT 
            r.Name AS grand_prix_name,
            r.Year,
            MIN(CAST(ps.StopDuration AS FLOAT)) AS fastest_pitstop_time
        FROM 
            Race r
        JOIN 
            Pit_Stops ps ON r.raceID = ps.raceID
        GROUP BY 
            r.Name, r.Year
        ORDER BY 
            fastest_pitstop_time ASC
    `;

    const [rows] = await pool.query<RowDataPacket[]>(sqlQuery);
    return rows;
}

export async function getPitStopAverages(grandPrixName: string): Promise<any[]> {
    const sqlQuery = `
        SELECT 
            r.Year,
            r.Name,
            AVG(CAST(ps.StopDuration AS FLOAT)) AS avg_pitstop_time
        FROM 
            Race r
        JOIN 
            Pit_Stops ps ON r.raceID = ps.raceID
        WHERE 
            r.Name = ?
        GROUP BY 
            r.Year, r.Name
        ORDER BY 
            r.Year
        LIMIT 100;
    `;

    const [rows] = await pool.query<RowDataPacket[]>(sqlQuery, [grandPrixName]);
    return rows;
}

export async function getRecalculatedDriverPoints(year: number): Promise<any[]> {
    console.log('Executing driver points query for year:', year);

    const sqlQuery = `
        WITH Race_Results_Points AS (
            SELECT 
                rr.driverID,
                r.raceID,
                r.Year,
                rr.FinalPosition,
                CASE
                    WHEN rr.FinalPosition = 1 THEN 25
                    WHEN rr.FinalPosition = 2 THEN 18
                    WHEN rr.FinalPosition = 3 THEN 15
                    WHEN rr.FinalPosition = 4 THEN 12
                    WHEN rr.FinalPosition = 5 THEN 10
                    WHEN rr.FinalPosition = 6 THEN 8
                    WHEN rr.FinalPosition = 7 THEN 6
                    WHEN rr.FinalPosition = 8 THEN 4
                    WHEN rr.FinalPosition = 9 THEN 2
                    WHEN rr.FinalPosition = 10 THEN 1
                    ELSE 0
                END AS points
            FROM 
                Race_Results rr
            JOIN 
                Race r ON rr.raceID = r.raceID
            WHERE 
                r.Year = ?
        ),
        Driver_Total_Points AS (
            SELECT 
                rr.driverID,
                SUM(rr.points) AS total_points
            FROM 
                Race_Results_Points rr
            GROUP BY 
                rr.driverID
        )
        SELECT 
            d.driverID,
            CONCAT(d.FirstName, ' ', d.LastName) AS DriverName,
            dtp.total_points AS points
        FROM 
            Driver_Total_Points dtp
        JOIN 
            Driver d ON dtp.driverID = d.driverID
        ORDER BY 
            dtp.total_points DESC
        LIMIT 15;
    `;

    const [rows] = await pool.query<RowDataPacket[]>(sqlQuery, [year]);
    console.log('Driver Points Results:', rows);
    return rows;
}

export async function getRecalculatedConstructorPoints(year: number): Promise<any[]> {
    console.log('Executing constructor points query for year:', year);

    const sqlQuery = `
        WITH Race_Results_2019_Points AS (
            SELECT 
                rr.driverID,
                rr.constructorID,
                r.raceID,
                r.Year,
                rr.FinalPosition,
                CASE
                    WHEN rr.FinalPosition = 1 THEN 25
                    WHEN rr.FinalPosition = 2 THEN 18
                    WHEN rr.FinalPosition = 3 THEN 15
                    WHEN rr.FinalPosition = 4 THEN 12
                    WHEN rr.FinalPosition = 5 THEN 10
                    WHEN rr.FinalPosition = 6 THEN 8
                    WHEN rr.FinalPosition = 7 THEN 6
                    WHEN rr.FinalPosition = 8 THEN 4
                    WHEN rr.FinalPosition = 9 THEN 2
                    WHEN rr.FinalPosition = 10 THEN 1
                    ELSE 0
                END AS driver_points
            FROM 
                Race_Results rr
            JOIN 
                Race r ON rr.raceID = r.raceID
            WHERE 
                r.Year = ?
        ),
        Constructor_Race_Points_New AS (
            SELECT 
                rp.constructorID,
                rp.raceID,
                SUM(rp.driver_points) AS race_points_new_system
            FROM 
                Race_Results_2019_Points rp
            GROUP BY 
                rp.constructorID, rp.raceID
        ),
        Constructor_Total_Points_New AS (
            SELECT 
                crp.constructorID,
                SUM(crp.race_points_new_system) AS total_points_new_system
            FROM 
                Constructor_Race_Points_New crp
            GROUP BY 
                crp.constructorID
        )
        SELECT 
            c.constructorID,
            c.name AS ConstructorName,
            ctp.total_points_new_system AS Updated_Points
        FROM 
            Constructor_Total_Points_New ctp
        JOIN 
            constructors c ON ctp.constructorID = c.constructorID
        ORDER BY 
            ctp.total_points_new_system DESC;
    `;

    try {
        const [rows] = await pool.query<RowDataPacket[]>(sqlQuery, [year, year]);
        console.log('Constructor Points Results:', rows);
        return rows;
    } catch (error) {
        console.error('Error executing constructor points query:', error);
        throw new Error('Failed to fetch recalculated constructor points');
    }
}

export const getQualifyingResults = async (lastName: string, year: number) => {
    const query = `
        WITH qualifying_positions AS (
            SELECT
                qr.raceID,
                qr.driverID,
                r.Name AS Race_Name,
                r.Year,
                d.LastName,
                qr.GridPosition AS QualifyingPosition
            FROM Qualifying_Results qr
            JOIN Driver d ON qr.driverID = d.driverID
            JOIN Race r ON qr.raceID = r.raceID
            WHERE d.LastName LIKE CONCAT('%', ?, '%') AND r.Year = ?
        ),
        race_positions AS (
            SELECT
                rr.raceID,
                rr.driverID,
                rr.FinalPosition AS FinishPosition
            FROM Race_Results rr
            JOIN Race r ON rr.raceID = r.raceID
            WHERE r.Year = ?
        ),
        positions_gained_lost AS (
            SELECT
                qp.Race_Name,
                qp.QualifyingPosition,
                rp.FinishPosition,
                CASE 
                    WHEN rp.FinishPosition = 0 THEN 0
                    ELSE (qp.QualifyingPosition - rp.FinishPosition)
                END AS PositionsGainedLost
            FROM qualifying_positions qp
            JOIN race_positions rp ON qp.raceID = rp.raceID AND qp.driverID = rp.driverID
        ),
        consistency_metrics AS (
            SELECT
                'Consistency Index' AS Race_Name,
                NULL AS QualifyingPosition,
                NULL AS FinishPosition,
                ROUND(STDDEV(PositionsGainedLost), 3) AS StdDev_PositionsGainedLost,
                ROUND(AVG(PositionsGainedLost), 3) AS Avg_PositionsGainedLost
            FROM positions_gained_lost
        )
        SELECT 
            Race_Name,
            QualifyingPosition,
            FinishPosition,
            PositionsGainedLost,
            NULL AS StdDev_PositionsGainedLost,
            NULL AS Avg_PositionsGainedLost
        FROM positions_gained_lost

        UNION ALL

        SELECT
            Race_Name,
            NULL AS QualifyingPosition,
            NULL AS FinishPosition,
            NULL AS PositionsGainedLost,
            StdDev_PositionsGainedLost,
            Avg_PositionsGainedLost
        FROM consistency_metrics

        ORDER BY Race_Name IS NULL;
    `;

    const [results] = await pool.query(query, [lastName, year, year]);
    return results;
};

export async function getHypotheticalFastestTimes(
    year: number,
    lastName: string
): Promise<{
    Year: number;
    Race: string;
    Driver_Name: string;
    Qualifying_Time_Q1: string | null;
    Qualifying_Time_Q2: string | null;
    Qualifying_Time_Q3: string | null;
    Hypothetical_Fastest_Time: string | null;
}[]> {
    const query = `
        WITH fastest_sector_times AS (
            SELECT
                raceID,
                driverID,
                CONCAT(
                    LPAD(FLOOR(SUM(Time) / 60), 2, '0'), ':',
                    LPAD(FLOOR(SUM(Time) % 60), 2, '0'), '.',
                    LPAD(ROUND((SUM(Time) - FLOOR(SUM(Time))) * 10, 1), 1, '0')
                ) AS hypothetical_fastest_time
            FROM sectors
            GROUP BY raceID, driverID
        ),
        best_qualifying_time AS (
            SELECT
                qr.raceID,
                qr.driverID,
                MIN(Q1Time) AS Q1Time,
                MIN(Q2Time) AS Q2Time,
                MIN(Q3Time) AS Q3Time
            FROM Qualifying_Results qr
            GROUP BY qr.raceID, qr.driverID
        ),
        combined_data AS (
            SELECT
                r.Year,
                r.Name AS Race,
                CONCAT(d.FirstName, ' ', d.LastName) AS Driver_Name,
                bq.Q1Time AS Qualifying_Time_Q1,
                bq.Q2Time AS Qualifying_Time_Q2,
                bq.Q3Time AS Qualifying_Time_Q3,
                f.hypothetical_fastest_time
            FROM fastest_sector_times f
            JOIN best_qualifying_time bq ON f.raceID = bq.raceID AND f.driverID = bq.driverID
            JOIN Race r ON f.raceID = r.raceID
            JOIN Driver d ON f.driverID = d.driverID
            WHERE r.Year = ? AND d.LastName LIKE CONCAT('%', ?, '%')
        )
        SELECT 
            Year,
            Race,
            Driver_Name,
            Qualifying_Time_Q1,
            Qualifying_Time_Q2,
            Qualifying_Time_Q3,
            hypothetical_fastest_time AS Hypothetical_Fastest_Time
        FROM combined_data;
    `;

    const [rows] = await pool.query<RowDataPacket[]>(query, [year, lastName]);
    return rows.map(row => ({
        Year: row.Year,
        Race: row.Race,
        Driver_Name: row.Driver_Name,
        Qualifying_Time_Q1: row.Qualifying_Time_Q1,
        Qualifying_Time_Q2: row.Qualifying_Time_Q2,
        Qualifying_Time_Q3: row.Qualifying_Time_Q3,
        Hypothetical_Fastest_Time: row.Hypothetical_Fastest_Time,
    }));
}
