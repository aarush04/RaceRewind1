import { Driver } from "../models/Driver";
import pool from './connection';
import { RowDataPacket } from "mysql2";


export async function getAllDrivers(): Promise<Driver[]> {
  try {
      // Execute the query to retrieve all rows from the Driver table
      const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM racerewind.Driver Limit 20;');
      console.log('Fetched drivers:', rows);
      return rows as Driver[]; // Return the result as an array
  } catch (error) {
      if (error instanceof Error) {
          console.error('Error fetching drivers:', error.message);
      } else {
          console.error('Unknown error:', error);
      }
      throw error; // Re-throw the error to propagate it up the chain
  }
}

