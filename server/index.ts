// server/index.ts

import express, { Request, Response, NextFunction, Application } from 'express';
import cors from 'cors';
import pointsrecalculation from './src/routes/pointsrecalculation';
import fastestPitStops from './src/routes/fastestPitStops';
import averagePitStop from './src/routes/averagePitStop';
import qualifyingResults from './src/routes/qualifyingResults';
import hypotheticalFastestTimes from './src/routes/hypotheticalFastestTimes';



const app = express();
const PORT = 3007;

app.use(cors());
app.use(express.json());

app.use('/api/points', pointsrecalculation);
app.use('/api/fastest-pitstops', fastestPitStops);
app.use('/api/average-pitstop', averagePitStop); 
app.use('/api/qualifying-results', qualifyingResults);
app.use('/api/hypothetical-fastest-times', hypotheticalFastestTimes);


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
