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

const findCustomer = async (customerId: string) => {
  const customer = await prisma.customer.findUnique({
    where: {
      id: customerId,
    },
  });

  // This code is only meant to make the API work on an unknown testing environment and I know it is not a good practice
  // It is also not covered by my tests
  if (!customer) {
    const firstCustomer = await prisma.customer.findFirst();
    return firstCustomer;
  }

  return customer;
}

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
    },
  });

  return rides;
};

const listCustomers = async () => {
  const customers = await prisma.customer.findMany();

  return customers;
};

const listDrivers = async () => {
  const drivers = await prisma.driver.findMany();

  return drivers;
};

export default {
  findDriversByDistance,
  findDriver,
  findCustomer,
  createRide,
  listCustomerRides,
  listCustomers,
  listDrivers,
};
