import { getLocationCoords, getRoutes } from '../../../src/utils/coord.util';
import axios from 'axios';
import { RoutesClient } from '@googlemaps/routing';

jest.mock('axios');
jest.mock('@googlemaps/routing');

describe('coord.util', () => {
  const GOOGLE_API_KEY = 'test-api-key';

  describe('getLocationCoords', () => {
    it('should return coordinates for a valid location', async () => {
      const location = 'New York, NY';
      const mockResponse = {
        data: {
          status: 'OK',
          results: [
            {
              geometry: {
                location: {
                  lat: 40.712776,
                  lng: -74.005974,
                },
              },
            },
          ],
        },
      };

      (axios.get as jest.Mock).mockResolvedValue(mockResponse);

      const coords = await getLocationCoords(location);

      expect(coords).toEqual({
        latitude: 40.712776,
        longitude: -74.005974,
      });
      expect(axios.get).toHaveBeenCalledWith(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          location,
        )}&key=${GOOGLE_API_KEY}`,
      );
    });

    it('should throw an error for an invalid location', async () => {
      const location = 'Invalid Location';
      const mockResponse = {
        data: {
          status: 'ZERO_RESULTS',
        },
      };

      (axios.get as jest.Mock).mockResolvedValue(mockResponse);

      await expect(getLocationCoords(location)).rejects.toThrow('Invalid location provided');
    });
  });

  describe('getRoutes', () => {
    it('should return routes for valid origin and destination', async () => {
      const origin = { latitude: 40.712776, longitude: -74.005974 };
      const destination = { latitude: 34.052235, longitude: -118.243683 };
      const mockRoutes = {
        routes: [
          {
            duration: '1 hour',
            distanceMeters: 1000,
          },
        ],
      };

      (RoutesClient.prototype.computeRoutes as jest.Mock).mockResolvedValue(mockRoutes);

      const routes = await getRoutes({
        origin,
        destination,
      });

      expect(routes).toEqual(mockRoutes);
      expect(RoutesClient).toHaveBeenCalledWith({ apiKey: GOOGLE_API_KEY });
      expect(RoutesClient.prototype.computeRoutes).toHaveBeenCalledWith(
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
          travelMode: 'DRIVE',
          routingPreference: 'TRAFFIC_UNAWARE',
        },
        {
          otherArgs: {
            headers: {
              'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters',
            },
          },
        },
      );
    });
  });
});
