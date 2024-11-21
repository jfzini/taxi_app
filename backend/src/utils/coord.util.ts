import type { ICoords } from '../interfaces/Coords';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

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
