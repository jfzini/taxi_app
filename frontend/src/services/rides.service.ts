import axios from 'axios';

// Interfaces / Types
import type { ConfirmRideBody } from './types';

export const estimateRide = async (customer_id: string, origin: string, destination: string) => {
  const response = await axios.post('http://localhost:8080/ride/estimate', {
    customer_id,
    origin,
    destination,
  });

  return response.data;
};

export const confirmRide = async (body: ConfirmRideBody) => {
  const response = await axios.patch('http://localhost:8080/ride/confirm', body);

  return response.data;
};

export const getCustomers = async () => {
  const response = await axios.get('http://localhost:8080/ride/customers');

  return response.data;
};

export const getDrivers = async () => {
  const response = await axios.get('http://localhost:8080/ride/drivers');

  return response.data;
};

export const getRides = async (customer_id: string, driver_id: string) => {
  const response = await axios.get(
    `http://localhost:8080/ride/${customer_id}?driver_id=${driver_id}`,
  );

  return response.data;
};
