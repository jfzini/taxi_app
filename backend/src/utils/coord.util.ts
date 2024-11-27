import type { ICoords, RoutesOptions } from '../interfaces/Coords';
import { RoutesClient } from '@googlemaps/routing';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export const getLocationCoords = async (location: string): Promise<ICoords> => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      location,
    )}&key=${GOOGLE_API_KEY}`,
  );

  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Invalid location provided');
  }

  const coords = response.data.results[0].geometry.location;

  return {
    latitude: coords.lat,
    longitude: coords.lng,
  };
};

export const getRoutes = async ({
  origin,
  destination,
  travelMode = 'DRIVE',
  routingPreference = 'TRAFFIC_UNAWARE',
}: RoutesOptions) => {
  const client = new RoutesClient({ apiKey: GOOGLE_API_KEY });
  const routes = await client.computeRoutes(
    {
      origin: {
        location: {
          latLng: origin,
        },
      },
      destination: {
        location: {
          latLng: destination,
        },
      },
      travelMode,
      routingPreference,
    },
    {
      otherArgs: {
        headers: {
          'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters',
        },
      },
    },
  );

  return routes;
};
