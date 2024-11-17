import { Driver } from "../models/Driver";
import pool from './connection';
import { RowDataPacket } from "mysql2";


export async function getAllDriver(): Promise<Driver[]> {
  const [rows] = await pool.query('SELECT * FROM racerewind.Driver LIMIT 20;');
  return rows as Driver[];
}

