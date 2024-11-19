import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
    console.error('Environment variables not set!');
    process.exit(1);
}

export const pool = mysql.createPool({
    host: process.env.DB_HOST || '104.198.33.153',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'hubm~tCC=DPsx0pS',
    database: process.env.DB_NAME || 'racerewind',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    debug: true,
});

console.log('Connected to MySQL database');
