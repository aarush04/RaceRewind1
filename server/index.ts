import express, { Request, Response } from 'express';
import route1 from './src/routes/route1';
import cors from 'cors';
import { getAllDriver } from './src/services/database';

const app = express();
const PORT = 3007;

app.use(express.json());
app.use(cors());

app.get('/api/', (req: Request, res: Response) => {
    res.send('abbas goat end.');
});

app.get('/drivers', async (req: Request, res: Response) => {
    try {
        console.log('GET /api/drivers called');
        const drivers = await getAllDriver();
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

app.use('/', route1);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
