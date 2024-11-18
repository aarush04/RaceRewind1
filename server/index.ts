import express from 'express';
import cors from 'cors';
import pitstopaverage from './src/routes/pitstopaverage'; // API routes for pit stop averages
import route1 from './src/routes/route1'; // Frontend route handler (serves React app)

const app = express();
const PORT = 3007;

app.use(express.json()); 
app.use(cors());

app.use('/api', pitstopaverage);

app.use('/', route1);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send({ error: 'An unexpected error occurred' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
