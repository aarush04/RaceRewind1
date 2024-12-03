import express, { Request, Response } from 'express';
import { getHypotheticalFastestTimes } from '../services/database';
import { asyncHandler } from '../asyncHandler';

const router = express.Router();

/**
 * @route GET /api/hypothetical-fastest-times
 * @desc Get hypothetical fastest lap times and qualifying times for a driver
 */
router.get(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
        const { year, lastName } = req.query;

        if (!year || !lastName) {
            return res.status(400).json({ error: 'Missing required query parameters: year, lastName' });
        }

        try {
            const data = await getHypotheticalFastestTimes(Number(year), lastName as string);
            res.json(data);
        } catch (error) {
            console.error('Error fetching hypothetical fastest times:', error);
            res.status(500).json({ error: 'Failed to fetch hypothetical fastest times' });
        }
    })
);

export default router;
