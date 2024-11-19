import {pool} from "./src/services/connection";

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Successfully connected to the database');
        connection.release();
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
})();
