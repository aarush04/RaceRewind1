import express, { Request, Response } from 'express';
import route1 from './src/routes/route1';
import cors from 'cors';

const app = express();
const PORT = 3007;

app.use(express.json());
app.use(cors());

app.get('/api/', (req: Request, res: Response) => {
    res.send('abbas goat end.');
});

app.use('/', route1);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_NAME);



