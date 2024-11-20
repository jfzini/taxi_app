import { Router, type Request, type Response } from 'express';
import estimateMiddleware from '../middlewares/estimate.middleware';

const rideRouter = Router();

rideRouter.get('/', (req: Request, res: Response) => {
  res.send('Ride route');
});
rideRouter.post('/estimate', estimateMiddleware, (req: Request, res: Response) => {
  res.json({ message: 'a' });
});

export default rideRouter;
