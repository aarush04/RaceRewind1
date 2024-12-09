// server/src/routes/fastestPitStops.ts

import express, { Request, Response } from 'express';
import { getFastestPitStopTimes } from '../services/database';
import { asyncHandler } from '../asyncHandler';

const router = express.Router();

/**
 * @route GET /api/fastest-pitstops
 * @desc Get the fastest pit stop times for all Grand Prix
 */
router.get(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
        try {
            const data = await getFastestPitStopTimes();
            res.json(data);
        } catch (error) {
            console.error("Error fetching fastest pit stop times:", error);
            res.status(500).json({ error: 'Failed to fetch fastest pit stop times' });
        }
    })
);
export default router;
