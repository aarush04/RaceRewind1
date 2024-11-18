import express, { Request, Response } from 'express';
import { getPitStopAverages } from '../services/database';
import { asyncHandler } from '../asyncHandler';

const router = express.Router();

/**
 * @route GET /api/pitstop-averages
 * @desc Get average pit stop durations by year for a specific Grand Prix
 * @query grandPrixName - Name of the Grand Prix
 */
router.get(
    '/api/pitstop-averages',
    asyncHandler(async (req: Request, res: Response) => {
        const grandPrixName = req.query.grandPrixName as string;
        console.log('Fetching pit stop averages for:', grandPrixName);

        if (!grandPrixName) {
            return res.status(400).json({ error: 'grandPrixName is required' });
        }

        const data = await getPitStopAverages(grandPrixName);
        res.json(data);
    })
);

export default router;
