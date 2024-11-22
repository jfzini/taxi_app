import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const findDrivers = async (distance: number) => {
  try {
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
  } catch (error) {
    console.error(error);
    return { status: 500, message: 'An error occurred while processing the request' };
  }
};

export default { findDrivers };
