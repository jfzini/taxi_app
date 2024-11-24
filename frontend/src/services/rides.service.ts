import axios from 'axios';

export const estimateRide = async (customer_id: string, origin: string, destination: string) => {
  const response = await axios.post('http://localhost:8080/ride/estimate', {
    customer_id,
    origin,
    destination,
  });

  return response.data;
};

export const confirmRide = async (body) => {
  const response = await axios.patch('http://localhost:8080/ride/confirm', body);

  return response.data;
};
