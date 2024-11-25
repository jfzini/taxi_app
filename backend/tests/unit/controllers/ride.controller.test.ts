import type { Request, Response } from 'express';
import RideService from '../../../src/services/ride.service';
import rideController from '../../../src/controllers/ride.controller';

jest.mock('../../../src/services/ride.service');

// Constants
const INTERNAL_SERVER_ERROR = {
	error_code: 'INTERNAL_SERVER_ERROR',
	error_description: 'Ocorreu um erro ao processar a solicitação. Tente novamente mais tarde',
};

describe('Ride Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  describe('estimateRoute', () => {
    beforeEach(() => {
      req = {
        body: {
          origin: 'origin',
          destination: 'destination',
        },
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    it('should return the estimated route with status code', async () => {
      const mockResponse = { distance: 10, time: 15 };
      (RideService.estimateRoute as jest.Mock).mockResolvedValue({
        status: 200,
        response: mockResponse,
      });

      await rideController.estimateRoute(req as Request, res as Response);

      expect(RideService.estimateRoute).toHaveBeenCalledWith('origin', 'destination');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResponse);
    });

    it('should handle errors and return 500 status code', async () => {
      const mockError = new Error('Test error');
      (RideService.estimateRoute as jest.Mock).mockRejectedValue(mockError);

      await rideController.estimateRoute(req as Request, res as Response);

      expect(RideService.estimateRoute).toHaveBeenCalledWith('origin', 'destination');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
    });
  });

  describe('confirmRide', () => {
    beforeEach(() => {
      req = {
        body: {
          customer_id: 'customer123',
          otherData: 'data',
        },
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    it('should confirm the ride and return status code', async () => {
      const mockResponse = { rideId: 'ride123' };
      (RideService.confirmRide as jest.Mock).mockResolvedValue({
        status: 200,
        response: mockResponse,
      });

      await rideController.confirmRide(req as Request, res as Response);

      expect(RideService.confirmRide).toHaveBeenCalledWith({
        customerId: 'customer123',
        otherData: 'data',
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResponse);
    });

    it('should handle errors and return 500 status code', async () => {
      const mockError = new Error('Test error');
      (RideService.confirmRide as jest.Mock).mockRejectedValue(mockError);

      await rideController.confirmRide(req as Request, res as Response);

      expect(RideService.confirmRide).toHaveBeenCalledWith({
        customerId: 'customer123',
        otherData: 'data',
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
    });
  });

  describe('listCustomerRides', () => {
    beforeEach(() => {
      req = {
        params: {
          customer_id: 'customer123',
        },
        query: {
          driver_id: '1',
        },
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    it('should list customer rides and return status code', async () => {
      const mockResponse = [{ rideId: 'ride123', driverId: 1 }];
      (RideService.listCustomerRides as jest.Mock).mockResolvedValue({
        status: 200,
        response: mockResponse,
      });

      await rideController.listCustomerRides(req as Request, res as Response);

      expect(RideService.listCustomerRides).toHaveBeenCalledWith('customer123', 1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResponse);
    });

    it('should handle errors and return 500 status code', async () => {
      const mockError = new Error('Test error');
      (RideService.listCustomerRides as jest.Mock).mockRejectedValue(mockError);

      await rideController.listCustomerRides(req as Request, res as Response);

      expect(RideService.listCustomerRides).toHaveBeenCalledWith('customer123', 1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
    });
  });

  describe('listCustomers', () => {
    beforeEach(() => {
      req = {};
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    it('should list customers and return status code', async () => {
      const mockResponse = [{ customerId: 'customer123' }];
      (RideService.listCustomers as jest.Mock).mockResolvedValue({
        status: 200,
        response: mockResponse,
      });

      await rideController.listCustomers(req as Request, res as Response);

      expect(RideService.listCustomers).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResponse);
    });

    it('should handle errors and return 500 status code', async () => {
      const mockError = new Error('Test error');
      (RideService.listCustomers as jest.Mock).mockRejectedValue(mockError);

      await rideController.listCustomers(req as Request, res as Response);

      expect(RideService.listCustomers).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
    });
  });

  describe('listDrivers', () => {
    beforeEach(() => {
      req = {};
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    it('should list drivers and return status code', async () => {
      const mockResponse = [{ driverId: 'driver123' }];
      (RideService.listDrivers as jest.Mock).mockResolvedValue({
        status: 200,
        response: mockResponse,
      });

      await rideController.listDrivers(req as Request, res as Response);

      expect(RideService.listDrivers).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResponse);
    });

    it('should handle errors and return 500 status code', async () => {
      const mockError = new Error('Test error');
      (RideService.listDrivers as jest.Mock).mockRejectedValue(mockError);

      await rideController.listDrivers(req as Request, res as Response);

      expect(RideService.listDrivers).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
    });
  });
});
