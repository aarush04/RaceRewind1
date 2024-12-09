// server/src/routes/averagePitStop.ts

import express, { Request, Response } from 'express';
import { getAveragePitStopTimesWithMinimum } from '../services/database';
import { asyncHandler } from '../asyncHandler';

const router = express.Router();

/**
 * @route GET /api/average-pitstop
 * @desc Get the Grand Prix with the average pit stop times and minimum averages
 */
router.get(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
        try {
            const data = await getAveragePitStopTimesWithMinimum();
            res.json(data);
        } catch (error) {
            console.error("Error fetching average pit stop times with minimum:", error);
            res.status(500).json({ error: 'Failed to fetch average pit stop times' });
        }
    })
);

export default router;
