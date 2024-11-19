import { Request, Response, NextFunction } from 'express';

/**
 * A utility function to wrap async route handlers and pass errors to the Express error handler.
 */
export const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
};