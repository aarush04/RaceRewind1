import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || '104.198.33.153',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'hubm~tCC=DPsx0pS',
    database: process.env.DB_NAME || 'db-fa24-race-rewind'
});

console.log('Connected to MySQL database');
export default pool;