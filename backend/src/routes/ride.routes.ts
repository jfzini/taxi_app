import { Router, type Request, type Response } from 'express';
import estimateMiddleware from '../middlewares/estimate.middleware';
import rideController from '../controllers/ride.controller';

const rideRouter = Router();

rideRouter.get('/', (req: Request, res: Response) => {
  res.send('Ride route');
});

rideRouter.post('/estimate', estimateMiddleware, rideController.estimateRoute);

export default rideRouter;
