import express, { Request, Response } from 'express';
import { getRecalculatedDriverPoints, getRecalculatedConstructorPoints } from '../services/database';
import { asyncHandler } from '../asyncHandler';

const router = express.Router();

/**
 * @route GET /api/points-recalculation
 * @desc Get recalculated championship points for drivers and constructors
 * @query year - The year for which points should be recalculated
 */
router.get(
    '/api/points-recalculation',
    asyncHandler(async (req: Request, res: Response) => {
        const yearParam = req.query.year as string;

        console.log('Received year param:', yearParam); // Log the received parameter

        // Validate the year parameter
        if (!yearParam || !/^\d{4}$/.test(yearParam)) {
            console.error('Invalid year format:', yearParam);
            return res.status(400).json({ error: 'A valid 4-digit year is required' });
        }

        const year = parseInt(yearParam);

        try {
            const driverPoints = await getRecalculatedDriverPoints(year);
            const constructorPoints = await getRecalculatedConstructorPoints(year);

            res.status(200).json({
                drivers: driverPoints.map((driver) => ({
                    DriverName: driver.DriverName,
                    points: driver.points,
                })),
                constructors: constructorPoints.map((constructor) => ({
                    ConstructorName: constructor.ConstructorName,
                    points_pre_2010_system: constructor.points_pre_2010_system,
                })),
            });
        } catch (err) {
            console.error('Error in recalculating points:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    })
);

export default router;