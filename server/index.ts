import express, { Request, Response, NextFunction, Application } from 'express';
import cors from 'cors';
import pointsrecalculation from './src/routes/pointsrecalculation'

const app = express();
const PORT = 3007;

app.use(cors());
app.use(express.json());

app.use('/api/points', pointsrecalculation);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
