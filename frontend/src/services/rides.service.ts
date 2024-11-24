import axios from 'axios';

export const estimateRide = async (customer_id: string, origin: string, destination: string) => {
  const response = await axios.post('http://localhost:8080/ride/estimate', {
    customer_id,
    origin,
    destination,
  });

  return response.data;
};
