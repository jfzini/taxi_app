import type { Request, Response } from 'express';
import { RoutesClient } from '@googlemaps/routing';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const estimateRoute = async (req: Request, res: Response) => {
  const { origin, destination } = req.body;

  try {
    const client = new RoutesClient({ apiKey: GOOGLE_API_KEY });

    const originCoordPromise = axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        origin,
      )}&key=${GOOGLE_API_KEY}`,
    );
    const destinationCoordPromise = axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        destination,
      )}&key=${GOOGLE_API_KEY}`,
    );

    const [originCoordResponse, destinationCoordResponse] = await Promise.all([
      originCoordPromise,
      destinationCoordPromise,
    ]);

    if (
      originCoordResponse.data.status === 'ZERO_RESULTS' ||
      destinationCoordResponse.data.status === 'ZERO_RESULTS'
    ) {
      res.status(400).json({
        error_code: 'INVALID_REQUEST',
        error_description: 'Invalid origin or destination provided',
      });
      return;
    }

    const originCoord = originCoordResponse.data.results[0].geometry.location;
    const destinationCoord = destinationCoordResponse.data.results[0].geometry.location;

    console.log({ originCoord, destinationCoord });

    const route = await client.computeRoutes(
      {
        origin: {
          location: {
            latLng: {
              latitude: originCoord.lat,
              longitude: originCoord.lng,
            },
          },
        },
        destination: {
          location: {
            latLng: {
              latitude: destinationCoord.lat,
              longitude: destinationCoord.lng,
            },
          },
        },
        travelMode: 'DRIVE',
        routingPreference: 'TRAFFIC_AWARE',
      },
      {
        otherArgs: {
          headers: {
            'X-Goog-FieldMask':
              'routes.duration,routes.distanceMeters',
          },
        },
      },
    );
    res.status(200).json(route);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error_code: 'INTERNAL_SERVER_ERROR',
      error_description: 'An error occurred while processing the request',
    });
  }
};

export default { estimateRoute };
