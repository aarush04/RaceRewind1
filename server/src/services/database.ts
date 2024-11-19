import { pool } from './connection';
import { RowDataPacket } from 'mysql2';

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
        LIMIT 15;
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
