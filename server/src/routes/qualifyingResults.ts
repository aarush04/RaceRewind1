import express, { Request, Response } from 'express';
import { getQualifyingResults } from '../services/database';
import { asyncHandler } from '../asyncHandler';

const router = express.Router();

/**
 * @route GET /api/qualifying-results
 * @desc Get qualifying and race results along with positions gained or lost and consistency metrics
 */
router.get(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
        const { lastName, year } = req.query;

        if (!lastName || !year) {
            return res.status(400).json({ error: 'Missing required query parameters: lastName, year' });
        }

        try {
            const data = await getQualifyingResults(lastName as string, parseInt(year as string, 10));
            res.json(data);
        } catch (error) {
            console.error("Error fetching qualifying results:", error);
            res.status(500).json({ error: 'Failed to fetch qualifying results' });
        }
    })
);

export default router;
