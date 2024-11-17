import express, { Request, Response } from 'express';
import path from 'path';

const router = express.Router();

const buildPath = path.join(__dirname, '../../../client/build');

router.use(express.static(buildPath));

router.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

export default router;


