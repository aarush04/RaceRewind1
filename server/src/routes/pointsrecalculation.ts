
import express, { Request, Response } from 'express';
import { getRecalculatedDriverPoints, getRecalculatedConstructorPoints } from '../services/database';
import { asyncHandler } from '../asyncHandler';
const router = express.Router();
router.get(
    '/recalculation',
    asyncHandler(async (req: Request, res: Response) => {
        const year = parseInt(req.query.year as string);

        if (isNaN(year)) {
            return res.status(400).json({ error: 'Invalid or missing year parameter' });
        }

        const driverPoints = await getRecalculatedDriverPoints(year);
        const constructorPoints = await getRecalculatedConstructorPoints(year);

        res.status(200).json({
            drivers: driverPoints,
            constructors: constructorPoints,
        });
    })
);
export default router;