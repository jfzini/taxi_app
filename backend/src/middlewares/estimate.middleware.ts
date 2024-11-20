import type { Request, Response, NextFunction } from 'express';

const estimateMiddleware = (req: Request, res: Response, next: NextFunction): void => {
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

export default estimateMiddleware;
