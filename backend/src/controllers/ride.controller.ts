import type { Request, Response } from 'express';

// Service
import RideService from '../services/ride.service';

const estimateRoute = async (req: Request, res: Response) => {
  const { origin, destination } = req.body;

  try {
    const { status, response } = await RideService.estimateRoute(origin, destination);
    res.status(status).json(response);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error_code: 'INTERNAL_SERVER_ERROR',
      error_description: 'An error occurred while processing the request',
    });
  }
};

const confirmRide = async (req: Request, res: Response) => {
  const { customer_id, ...body } = req.body;
  body.customerId = customer_id;

  try {
    const { status, response } = await RideService.confirmRide(body);
    res.status(status).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error_code: 'INTERNAL_SERVER_ERROR',
      error_description: 'An error occurred while processing the request',
    });
  }
};

export default { estimateRoute, confirmRide };
