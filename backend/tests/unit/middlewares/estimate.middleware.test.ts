import type { Request, Response, NextFunction } from 'express';
import {
  estimateMiddleware,
  listRidesMiddleware,
} from '../../../src/middlewares/ride.middleware';

// Constants
const MISSING_PARAMS = {
  error_code: 'INVALID_DATA',
  error_description: 'Campos obrigatórios não preenchidos. Confira os campos e tente novamente',
};
const EQUAL_ORIGIN_DESTINATION = {
  error_code: 'INVALID_DATA',
  error_description: 'Origem e destino não podem ser iguais. Confira os campos e tente novamente',
};

describe('Estimate Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  describe('estimateMiddleware', () => {
    beforeEach(() => {
      req = {
        body: {},
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      next = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return 400 if customer_id is missing', () => {
      req.body = { origin: 'A', destination: 'B' };

      estimateMiddleware(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(MISSING_PARAMS);
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 400 if origin is missing', () => {
      req.body = { customer_id: '123', destination: 'B' };

      estimateMiddleware(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(MISSING_PARAMS);
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 400 if destination is missing', () => {
      req.body = { customer_id: '123', origin: 'A' };

      estimateMiddleware(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(MISSING_PARAMS);
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 400 if origin and destination are the same', () => {
      req.body = { customer_id: '123', origin: 'A', destination: 'A' };

      estimateMiddleware(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(EQUAL_ORIGIN_DESTINATION);
      expect(next).not.toHaveBeenCalled();
    });

    it('should call next if all required fields are present and valid', () => {
      req.body = { customer_id: '123', origin: 'A', destination: 'B' };

      estimateMiddleware(req as Request, res as Response, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe('listRidesMiddleware', () => {
    beforeEach(() => {
      req = {
        params: {},
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      next = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return 400 if customer_id is missing', () => {
      req.params = {};

      listRidesMiddleware(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(MISSING_PARAMS);
      expect(next).not.toHaveBeenCalled();
    });

    it('should call next if customer_id is present', () => {
      req.params = { customer_id: '123' };

      listRidesMiddleware(req as Request, res as Response, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
