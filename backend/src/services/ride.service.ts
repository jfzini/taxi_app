// Utils
import { getLocationCoords, getRoutes } from '../utils/coord.util';

// Interfaces / Types
import type { IConfirmRideParams } from '../interfaces/Ride';

// Model
import RideModel from '../models/ride.model';

const estimateRoute = async (origin: string, destination: string) => {
  try {
    const originCoordsPromise = getLocationCoords(origin);
    const destinationCoordsPromise = getLocationCoords(destination);

    const [originCoords, destinationCoords] = await Promise.all([
      originCoordsPromise,
      destinationCoordsPromise,
    ]);

    const [routes] = await getRoutes({
      origin: originCoords,
      destination: destinationCoords,
    });

    const shorterRoute = routes.routes?.sort(
      (a, b) => Number(a.distanceMeters) - Number(b.distanceMeters),
    )[0];

    if (!shorterRoute) {
      return { status: 404, message: 'No routes found' };
    }
    const distance = Number(shorterRoute.distanceMeters);
    const drivers = await RideModel.findDriversByDistance(distance);

    const response = {
      origin: originCoords,
      destination: destinationCoords,
      distance,
      duration: shorterRoute.duration?.seconds,
      options: drivers,
      routeResponse: routes,
    };

    return { status: 200, response };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      response: {
        error_code: 'INTERNAL_SERVER_ERROR',
        error_description: 'Ocorreu um erro ao processar a solicitação. Tente novamente mais tarde',
      },
    };
  }
};

const confirmRide = async ({
  customerId,
  origin,
  destination,
  distance,
  duration,
  driver,
  value,
}: IConfirmRideParams) => {
  try {
    const foundCustomer = await RideModel.findCustomer(customerId);

    if (!foundCustomer) {
      return {
        status: 404,
        response: {
          error_code: 'CUSTOMER_NOT_FOUND',
          error_description: 'Nenhum cliente foi encontrado com esse ID. Verifique a informação e tente novamente',
        },
      };
    }

    const foundDriver = await RideModel.findDriver(driver);

    if (!foundDriver) {
      return {
        status: 404,
        response: {
          error_code: 'DRIVER_NOT_FOUND',
          error_description: 'Nenhum motorista foi encontrado',
        },
      };
    }

    const distanceInKm = distance / 1000;

    if (foundDriver.minKm > distanceInKm) {
      return {
        status: 406,
        response: {
          error_code: 'INVALID_DISTANCE',
          error_description: 'Distância mínima do motorista não foi atingida.',
        },
      };
    }

    const rideToCreate = {
      origin,
      destination,
      distance,
      duration,
      value,
      customerId: foundCustomer.id,
      driverId: foundDriver.id,
    };

    await RideModel.createRide(rideToCreate);

    return {
      status: 200,
      response: {
        success: true,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      response: {
        error_code: 'INTERNAL_SERVER_ERROR',
        error_description: 'Ocorreu um erro ao processar a solicitação. Tente novamente mais tarde',
      },
    };
  }
};

const listCustomerRides = async (customerId: string, driverId?: number) => {
  try {
    const foundCustomer = await RideModel.findCustomer(customerId);

    if (!foundCustomer) {
      return {
        status: 400,
        response: {
          error_code: 'INVALID_CUSTOMER',
          error_description: 'Nenhum cliente foi encontrado com esse ID. Verifique a informação e tente novamente',
        },
      };
    }

    if (driverId) {
      const foundDriver = await RideModel.findDriver({ id: driverId });

      if (!foundDriver) {
        return {
          status: 400,
          response: {
            error_code: 'INVALID_DRIVER',
            error_description: 'O motorista informado não foi encontrado',
          },
        };
      }
    }

    const rides = await RideModel.listCustomerRides(foundCustomer.id, driverId);

    if (rides.length === 0) {
      return {
        status: 404,
        response: {
          error_code: 'NO_RIDES_FOUND',
          error_description: 'Nenhuma viagem encontrada',
        },
      };
    }

    const response = {
      customer_id: customerId,
      rides,
    };

    return { status: 200, response };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      response: {
        error_code: 'INTERNAL_SERVER_ERROR',
        error_description: 'Ocorreu um erro ao processar a solicitação. Tente novamente mais tarde',
      },
    };
  }
};

const listCustomers = async () => {
  try {
    const customers = await RideModel.listCustomers();

    if (customers.length === 0) {
      return {
        status: 404,
        response: {
          error_code: 'NO_CUSTOMERS_FOUND',
          error_description: 'Nenhum cliente encontrado',
        },
      };
    }

    return { status: 200, response: customers };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      response: {
        error_code: 'INTERNAL_SERVER_ERROR',
        error_description: 'Ocorreu um erro ao processar a solicitação. Tente novamente mais tarde',
      },
    };
  }
};

const listDrivers = async () => {
  try {
    const drivers = await RideModel.listDrivers();

    if (drivers.length === 0) {
      return {
        status: 404,
        response: {
          error_code: 'NO_DRIVERS_FOUND',
          error_description: 'Nenhum motorista encontrado',
        },
      };
    }

    return { status: 200, response: drivers };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      response: {
        error_code: 'INTERNAL_SERVER_ERROR',
        error_description: 'Ocorreu um erro ao processar a solicitação. Tente novamente mais tarde',
      },
    };
  }
};

export default { estimateRoute, confirmRide, listCustomerRides, listCustomers, listDrivers };
