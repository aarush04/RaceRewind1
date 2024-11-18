import { Router, Request, Response } from 'express';
import pool from '../services/connection';

const router = Router();

// Define an interface for query parameters
interface YearQuery {
    year?: string;
}

// Driver Points by Year
router.get('/driver-points', async (req: Request<{}, any, any, YearQuery>, res: Response): Promise<void> => {
    const { year } = req.query;
    if (!year) {
        res.status(400).json({ error: 'Year is required' });
        return;
    }

    try {
        const [rows]: [any[], any] = await pool.query(
            `WITH Race_Results_2004_Points AS (
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
            Driver_Total_Points_2004 AS (
                SELECT 
                    driverID,
                    SUM(points) AS total_points
                FROM 
                    Race_Results_2004_Points
                GROUP BY 
                    driverID
            )
            SELECT 
                d.driverID,
                CONCAT(d.FirstName, ' ', d.LastName) AS DriverName,
                dtp.total_points AS points_2004_system
            FROM 
                Driver_Total_Points_2004 dtp
            JOIN 
                Driver d ON dtp.driverID = d.driverID
            ORDER BY 
                dtp.total_points DESC
            LIMIT 15;`,
            [year]
        );
        res.json(rows);
    } catch (err) {
        console.error('Error calculating driver points:', err);
        res.status(500).json({ error: 'Failed to calculate driver points' });
    }
});

// Constructor Points by Year
router.get('/constructor-points', async (req: Request<{}, any, any, YearQuery>, res: Response): Promise<void> => {
    const { year } = req.query;
    if (!year) {
        res.status(400).json({ error: 'Year is required' });
        return;
    }

    try {
        const [rows]: [any[], any] = await pool.query(
            `WITH Race_Results_Constructor_Points AS (
                SELECT 
                    rr.constructorID,
                    r.raceID,
                    r.Year,
                    rr.FinalPosition,
                    CASE
                        WHEN rr.FinalPosition = 1 THEN 10
                        WHEN rr.FinalPosition = 2 THEN 8
                        WHEN rr.FinalPosition = 3 THEN 6
                        WHEN rr.FinalPosition = 4 THEN 5
                        WHEN rr.FinalPosition = 5 THEN 4
                        WHEN rr.FinalPosition = 6 THEN 3
                        WHEN rr.FinalPosition = 7 THEN 2
                        WHEN rr.FinalPosition = 8 THEN 1
                        ELSE 0
                    END AS points_pre_2010_system
                FROM 
                    Race_Results rr
                JOIN 
                    Race r ON rr.raceID = r.raceID
                WHERE 
                    r.Year = ?
            ),
            Constructor_Total_Points_Pre_2010 AS (
                SELECT 
                    constructorID,
                    SUM(points_pre_2010_system) AS total_points_pre_2010
                FROM 
                    Race_Results_Constructor_Points
                GROUP BY 
                    constructorID
            )
            SELECT 
                c.constructorID,
                c.name AS ConstructorName,
                ctpp.total_points_pre_2010 AS points_pre_2010_system
            FROM 
                Constructor_Total_Points_Pre_2010 ctpp
            JOIN 
                constructors c ON ctpp.constructorID = c.constructorID
            ORDER BY 
                ctpp.total_points_pre_2010 DESC;`,
            [year]
        );
        res.json(rows);
    } catch (err) {
        console.error('Error calculating constructor points:', err);
        res.status(500).json({ error: 'Failed to calculate constructor points' });
    }
});

export default router;
