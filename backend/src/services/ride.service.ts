import { getLocationCoords, getRoutes } from '../utils/coord.util';

const estimateRoute = async (origin: string, destination: string) => {
  try {
    const originCoordsPromise = getLocationCoords(origin);
    const destinationCoordsPromise = getLocationCoords(destination);

    const [originCoords, destinationCoords] = await Promise.all([
      originCoordsPromise,
      destinationCoordsPromise,
    ]);

    const routes = await getRoutes({ origin: originCoords, destination: destinationCoords });
    return routes;
  } catch (error) {}
};

export default { estimateRoute };
