import express, { Request, Response } from 'express';
import cors from 'cors';
import route1 from './src/routes/route1';
import recalculationRoutes from './src/routes/recalculation';
import { getAllDrivers } from './src/services/database';

const app = express();
const PORT = 3007;

// Middleware
app.use(express.json());
app.use(cors());

// Root API Endpoint
app.get('/api/', (req: Request, res: Response) => {
    res.send('Welcome to F1 Points API');
});

// Drivers Endpoint
app.get('/api/drivers', async (req: Request, res: Response) => {
    try {
        console.log('GET /api/drivers called');
        const drivers = await getAllDrivers();
        console.log('Returning drivers:', drivers);
        res.json(drivers);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error in /api/drivers:', error.message);
            res.status(500).json({ error: error.message });
        } else {
            console.error('Unknown error:', error);
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});

// Mount Recalculation Routes
app.use('/api/recalculation', recalculationRoutes);

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
