import type { Request, Response, NextFunction } from 'express';

export const estimateMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { customer_id, origin, destination } = req.body;
  if (!customer_id || !origin || !destination) {
    res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Campos obrigatórios não preenchidos. Confira os campos e tente novamente',
    });
    return;
  }

  if (origin === destination) {
    res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Origem e destino não podem ser iguais. Confira os campos e tente novamente',
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
      error_description: 'Campos obrigatórios não preenchidos. Confira os campos e tente novamente',
    });
    return;
  }

  next();
}
