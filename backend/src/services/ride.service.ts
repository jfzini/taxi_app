import { getLocationCoords, getRoutes } from '../utils/coord.util';

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

    const [routes] = await getRoutes({ origin: originCoords, destination: destinationCoords });

    const shorterRoute = routes.routes?.sort(
      (a, b) => Number(a.distanceMeters) - Number(b.distanceMeters),
    )[0];

    if (!shorterRoute) {
      return { status: 404, message: 'No routes found' };
    }
    const distance = Number(shorterRoute.distanceMeters);
    const drivers = await RideModel.findDrivers(distance);

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
    return { status: 500, response: 'An error occurred while processing the request' };
  }
};

export default { estimateRoute };
