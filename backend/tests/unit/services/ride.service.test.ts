import RideService from '../../../src/services/ride.service';
import RideModel from '../../../src/models/ride.model';
import { getLocationCoords, getRoutes } from '../../../src/utils/coord.util';

jest.mock('../../../src/models/ride.model');
jest.mock('../../../src/utils/coord.util');

// Constants
const NO_DRIVERS_FOUND = {
  error_code: 'NO_DRIVERS_FOUND',
  error_description: 'Nenhum motorista encontrado',
};
const INTERNAL_SERVER_ERROR = {
  error_code: 'INTERNAL_SERVER_ERROR',
  error_description: 'Ocorreu um erro ao processar a solicitação. Tente novamente mais tarde',
};
const INVALID_INSTANCE_DRIVER = {
  error_code: 'INVALID_INSTANCE',
  error_description: 'Nenhum motorista foi encontrado',
};
const INVALID_INSTANCE_DISTANCE = {
  error_code: 'INVALID_INSTANCE',
  error_description: 'Distância mínima do motorista não foi atingida.',
};
const INVALID_DRIVER = {
  error_code: 'INVALID_DRIVER',
  error_description: 'O motorista informado não foi encontrado',
};
const NO_RIDES_FOUND = {
  error_code: 'NO_RIDES_FOUND',
  error_description: 'Nenhuma viagem encontrada',
};
const NO_CUSTOMERS_FOUND = {
  error_code: 'NO_CUSTOMERS_FOUND',
  error_description: 'Nenhum cliente encontrado',
};

describe('RideService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('listDrivers', () => {
    it('should return 404 if no drivers are found', async () => {
      (RideModel.listDrivers as jest.Mock).mockResolvedValue([]);

      const result = await RideService.listDrivers();

      expect(result).toEqual({
        status: 404,
        response: NO_DRIVERS_FOUND,
      });
    });

    it('should return 200 with drivers if drivers are found', async () => {
      const mockDrivers = [
        { id: 1, name: 'Driver 1' },
        { id: 2, name: 'Driver 2' },
      ];
      (RideModel.listDrivers as jest.Mock).mockResolvedValue(mockDrivers);

      const result = await RideService.listDrivers();

      expect(result).toEqual({
        status: 200,
        response: mockDrivers,
      });
    });

    it('should return 500 if an error occurs', async () => {
      (RideModel.listDrivers as jest.Mock).mockRejectedValue(new Error('Database error'));

      const result = await RideService.listDrivers();

      expect(result).toEqual({
        status: 500,
        response: INTERNAL_SERVER_ERROR,
      });
    });
  });

  describe('estimateRoute', () => {
    it('should return 404 if no routes are found', async () => {
      (getLocationCoords as jest.Mock).mockResolvedValueOnce({ lat: 0, lng: 0 });
      (getLocationCoords as jest.Mock).mockResolvedValueOnce({ lat: 1, lng: 1 });
      (getRoutes as jest.Mock).mockResolvedValueOnce([{ routes: [] }]);

      const result = await RideService.estimateRoute('origin', 'destination');

      expect(result).toEqual({
        status: 404,
        message: 'No routes found',
      });
    });

    it('should return 200 with route details if routes are found', async () => {
      const mockRoute = [
        {
          routes: [
            {
              distanceMeters: '6000',
              duration: { seconds: 2600 },
            },
            {
              distanceMeters: '3000',
              duration: { seconds: 1500 },
            },
            {
              distanceMeters: '2000',
              duration: { seconds: 1100 },
            },
          ],
        },
      ];
      const mockDrivers = [{ id: 1, name: 'Driver 1' }];
      (getLocationCoords as jest.Mock).mockResolvedValueOnce({ lat: 0, lng: 0 });
      (getLocationCoords as jest.Mock).mockResolvedValueOnce({ lat: 1, lng: 1 });
      (getRoutes as jest.Mock).mockResolvedValueOnce(mockRoute);
      (RideModel.findDriversByDistance as jest.Mock).mockResolvedValue(mockDrivers);

      const result = await RideService.estimateRoute('origin', 'destination');

      expect(result).toEqual({
        status: 200,
        response: {
          origin: { lat: 0, lng: 0 },
          destination: { lat: 1, lng: 1 },
          distance: 2000,
          duration: 1100,
          options: mockDrivers,
          routeResponse: mockRoute[0],
        },
      });
    });

    it('should return 500 if an error occurs', async () => {
      (getLocationCoords as jest.Mock).mockRejectedValue(new Error('API error'));

      const result = await RideService.estimateRoute('origin', 'destination');

      expect(result).toEqual({
        status: 500,
        response: INTERNAL_SERVER_ERROR,
      });
    });
  });

  describe('confirmRide', () => {
    it('should return 404 if no driver is found', async () => {
      (RideModel.findDriver as jest.Mock).mockResolvedValue(null);

      const result = await RideService.confirmRide({
        customerId: '1',
        origin: 'origin',
        destination: 'destination',
        distance: 1000,
        duration: '600',
        driver: {
          id: 1,
          name: 'Driver',
        },
        value: 100,
      });

      expect(result).toEqual({
        status: 404,
        response: INVALID_INSTANCE_DRIVER,
      });
    });

    it('should return 406 if driver minimum distance is not met', async () => {
      (RideModel.findDriver as jest.Mock).mockResolvedValue({ id: 'driver', minKm: 2 });

      const result = await RideService.confirmRide({
        customerId: '1',
        origin: 'origin',
        destination: 'destination',
        distance: 1000,
        duration: '600',
        driver: {
          id: 1,
          name: 'Driver',
        },
        value: 100,
      });

      expect(result).toEqual({
        status: 406,
        response: INVALID_INSTANCE_DISTANCE,
      });
    });

    it('should return 200 if ride is successfully created', async () => {
      (RideModel.findDriver as jest.Mock).mockResolvedValue({ id: 'driver', minKm: 0 });
      (RideModel.createRide as jest.Mock).mockResolvedValue({});

      const result = await RideService.confirmRide({
        customerId: '1',
        origin: 'origin',
        destination: 'destination',
        distance: 1000,
        duration: '600',
        driver: {
          id: 1,
          name: 'Driver',
        },
        value: 100,
      });

      expect(result).toEqual({
        status: 200,
        response: {
          success: true,
        },
      });
    });

    it('should return 500 if an error occurs', async () => {
      (RideModel.findDriver as jest.Mock).mockRejectedValue(new Error('Database error'));

      const result = await RideService.confirmRide({
        customerId: '1',
        origin: 'origin',
        destination: 'destination',
        distance: 1000,
        duration: '600',
        driver: {
          id: 1,
          name: 'Driver',
        },
        value: 100,
      });

      expect(result).toEqual({
        status: 500,
        response: INTERNAL_SERVER_ERROR,
      });
    });
  });

  describe('listCustomerRides', () => {
    it('should return 400 if driver is not found', async () => {
      (RideModel.findDriver as jest.Mock).mockResolvedValue(null);

      const result = await RideService.listCustomerRides('customerId', 1);

      expect(result).toEqual({
        status: 400,
        response: INVALID_DRIVER,
      });
    });

    it('should return 404 if no rides are found', async () => {
      (RideModel.listCustomerRides as jest.Mock).mockResolvedValue([]);

      const result = await RideService.listCustomerRides('customerId');

      expect(result).toEqual({
        status: 404,
        response: NO_RIDES_FOUND,
      });
    });

    it('should return 200 with rides if rides are found', async () => {
      const mockRides = [{ id: 1, origin: 'origin', destination: 'destination' }];
      (RideModel.listCustomerRides as jest.Mock).mockResolvedValue(mockRides);

      const result = await RideService.listCustomerRides('customerId');

      expect(result).toEqual({
        status: 200,
        response: {
          customer_id: 'customerId',
          rides: mockRides,
        },
      });
    });

    it('should return 500 if an error occurs', async () => {
      (RideModel.listCustomerRides as jest.Mock).mockRejectedValue(new Error('Database error'));

      const result = await RideService.listCustomerRides('customerId');

      expect(result).toEqual({
        status: 500,
        response: INTERNAL_SERVER_ERROR,
      });
    });
  });

  describe('listCustomers', () => {
    it('should return 404 if no customers are found', async () => {
      (RideModel.listCustomers as jest.Mock).mockResolvedValue([]);

      const result = await RideService.listCustomers();

      expect(result).toEqual({
        status: 404,
        response: NO_CUSTOMERS_FOUND,
      });
    });

    it('should return 200 with customers if customers are found', async () => {
      const mockCustomers = [{ id: 1, name: 'Customer 1' }];
      (RideModel.listCustomers as jest.Mock).mockResolvedValue(mockCustomers);

      const result = await RideService.listCustomers();

      expect(result).toEqual({
        status: 200,
        response: mockCustomers,
      });
    });

    it('should return 500 if an error occurs', async () => {
      (RideModel.listCustomers as jest.Mock).mockRejectedValue(new Error('Database error'));

      const result = await RideService.listCustomers();

      expect(result).toEqual({
        status: 500,
        response: INTERNAL_SERVER_ERROR,
      });
    });
  });
});
