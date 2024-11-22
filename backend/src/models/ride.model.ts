import { PrismaClient } from '@prisma/client';

// Interfaces / Types
import type { IRide } from '../interfaces/Ride';

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
  }));

  return mappedDrivers;
};

const findDriver = async (id: number, name: string) => {
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

export default { findDriversByDistance, findDriver, createRide };
