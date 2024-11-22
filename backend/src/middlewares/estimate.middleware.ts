import type { Request, Response, NextFunction } from 'express';

export const estimateMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { customer_id, origin, destination } = req.body;
  if (!customer_id || !origin || !destination) {
    res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Missing required fields',
    });
    return;
  }

  if (origin === destination) {
    res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Origin and destination cannot be the same',
    });
    return;
  }

  next();
};

export const listRidesMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { customer_id } = req.params;
  if (!customer_id) {
    res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Missing required fields',
    });
    return;
  }

  next();
}
