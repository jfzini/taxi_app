import { PrismaClient } from '@prisma/client';

// Interfaces / Types
import type { IDriver, IRide } from '../interfaces/Ride';

const prisma = new PrismaClient();

const findDriversByDistance = async (distance: number) => {
  // convert distance to kilometers
  const distanceKm = distance / 1000;

  const drivers = await prisma.driver.findMany({
    where: {
      minKm: {
        lte: distanceKm,
      },
    },
    orderBy: {
      ratePerKm: 'asc',
    },
  });

  const mappedDrivers = drivers.map((d) => ({
    id: d.id,
    name: d.name,
    description: d.description,
    vehicle: d.vehicle,
    review: {
      rating: d.rating,
      comment: d.comment,
    },
    value: d.ratePerKm * distanceKm,
  }));

  return mappedDrivers;
};

const findDriver = async ({ id, name }: IDriver) => {
  const driver = await prisma.driver.findUnique({
    where: {
      id,
      name,
    },
  });

  return driver;
};

const createRide = async (ride: IRide) => {
  const createdRide = await prisma.ride.create({
    data: ride,
  });

  return createdRide;
};

const listCustomerRides = async (customerId: string, driverId?: number) => {
  const parsedDriverId = driverId ? driverId : undefined; // Avoid inconsistencies with NaN and null values

  const rides = await prisma.ride.findMany({
    where: {
      customerId,
      driverId: parsedDriverId,
    },
    select: {
      id: true,
      date: true,
      origin: true,
      destination: true,
      distance: true,
      duration: true,
      driver: {
        select: {
          id: true,
          name: true,
        },
      },
      value: true,
    },
    orderBy: {
      date: 'desc',
    }
  });

  return rides;
};

const listCustomers = async () => {
  const customers = await prisma.customer.findMany();

  return customers;
}

export default { findDriversByDistance, findDriver, createRide, listCustomerRides, listCustomers };
