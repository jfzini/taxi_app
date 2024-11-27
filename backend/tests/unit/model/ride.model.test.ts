import rideModel from '../../../src/models/ride.model';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

jest.mock('@prisma/client', () => {
  const mockPrisma = {
    driver: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
    ride: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
    customer: {
      findMany: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockPrisma) };
});

describe('rideModel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findDriversByDistance', () => {
    it('should return drivers sorted by ratePerKm', async () => {
      const mockDrivers = [
        {
          id: 1,
          name: 'Driver1',
          description: 'Desc1',
          vehicle: 'Car1',
          rating: 4.5,
          comment: 'Good',
          ratePerKm: 8,
          minKm: 1,
        },
        {
          id: 2,
          name: 'Driver2',
          description: 'Desc2',
          vehicle: 'Car2',
          rating: 4.0,
          comment: 'Average',
          ratePerKm: 10,
          minKm: 1,
        },
      ];
      (prisma.driver.findMany as jest.Mock).mockResolvedValue(mockDrivers);

      const result = await rideModel.findDriversByDistance(5000);

      expect(prisma.driver.findMany).toHaveBeenCalledWith({
        where: { minKm: { lte: 5 } },
        orderBy: { ratePerKm: 'asc' },
      });
      expect(result).toEqual([
        {
          id: 1,
          name: 'Driver1',
          description: 'Desc1',
          vehicle: 'Car1',
          review: { rating: 4.5, comment: 'Good' },
          value: 40,
        },
        {
          id: 2,
          name: 'Driver2',
          description: 'Desc2',
          vehicle: 'Car2',
          review: { rating: 4.0, comment: 'Average' },
          value: 50,
        },
      ]);
    });
  });

  describe('findDriver', () => {
    it('should return a driver by id and name', async () => {
      const mockDriver = {
        id: 1,
        name: 'Driver1',
        description: 'Desc1',
        vehicle: 'Car1',
        rating: 4.5,
        comment: 'Good',
      };
      (prisma.driver.findUnique as jest.Mock).mockResolvedValue(mockDriver);

      const result = await rideModel.findDriver({ id: 1, name: 'Driver1' });

      expect(prisma.driver.findUnique).toHaveBeenCalledWith({
        where: { id: 1, name: 'Driver1' },
      });
      expect(result).toEqual(mockDriver);
    });
  });

  describe('createRide', () => {
    it('should create a new ride', async () => {
      const mockRide = {
        origin: 'A',
        destination: 'B',
        distance: 10,
        duration: '20',
        value: 100,
        customerId: 'cust1',
        driverId: 1,
      };
      (prisma.ride.create as jest.Mock).mockResolvedValue(mockRide);

      const result = await rideModel.createRide(mockRide);

      expect(prisma.ride.create).toHaveBeenCalledWith({
        data: mockRide,
      });
      expect(result).toEqual(mockRide);
    });
  });

  describe('listCustomerRides', () => {
    it('should return all rides for a customer', async () => {
      const mockRides = [
        {
          id: 1,
          date: new Date(),
          origin: 'A',
          destination: 'B',
          distance: 10,
          duration: 20,
          driver: { id: 1, name: 'Driver1' },
          value: 100,
        },
        {
          id: 2,
          date: new Date(),
          origin: 'B',
          destination: 'C',
          distance: 20,
          duration: 30,
          driver: { id: 2, name: 'Driver2' },
          value: 200,
        },
      ];
      (prisma.ride.findMany as jest.Mock).mockResolvedValue(mockRides);

      const result = await rideModel.listCustomerRides('cust1');

      expect(prisma.ride.findMany).toHaveBeenCalledWith({
        where: { customerId: 'cust1', driverId: undefined },
        select: {
          id: true,
          date: true,
          origin: true,
          destination: true,
          distance: true,
          duration: true,
          driver: { select: { id: true, name: true } },
          value: true,
        },
        orderBy: { date: 'desc' },
      });
      expect(result).toEqual(mockRides);
    });

    it('should return the customers rides for a specific driver', async () => {
      const mockRides = [
        {
          id: 1,
          date: new Date(),
          origin: 'A',
          destination: 'B',
          distance: 10,
          duration: 20,
          driver: { id: 1, name: 'Driver1' },
          value: 100,
        },
      ];
      (prisma.ride.findMany as jest.Mock).mockResolvedValue(mockRides);

      const result = await rideModel.listCustomerRides('cust1', 1);

      expect(prisma.ride.findMany).toHaveBeenCalledWith({
        where: { customerId: 'cust1', driverId: 1 },
        select: {
          id: true,
          date: true,
          origin: true,
          destination: true,
          distance: true,
          duration: true,
          driver: { select: { id: true, name: true } },
          value: true,
        },
        orderBy: { date: 'desc' },
      });
      expect(result).toEqual(mockRides);
    });
  });

  describe('listCustomers', () => {
    it('should return all customers', async () => {
      const mockCustomers = [{ id: 'cust1', name: 'Customer1' }];
      (prisma.customer.findMany as jest.Mock).mockResolvedValue(mockCustomers);

      const result = await rideModel.listCustomers();

      expect(prisma.customer.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockCustomers);
    });
  });

  describe('listDrivers', () => {
    it('should return all drivers', async () => {
      const mockDrivers = [{ id: 1, name: 'Driver1' }];
      (prisma.driver.findMany as jest.Mock).mockResolvedValue(mockDrivers);

      const result = await rideModel.listDrivers();

      expect(prisma.driver.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockDrivers);
    });
  });
});
