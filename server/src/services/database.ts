import pool from './connection';
import { RowDataPacket } from "mysql2";


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

