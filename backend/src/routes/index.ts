import rideRouter from './Ride.routes';
import { Router } from 'express';

const router = Router();

router.use('/ride', rideRouter);

export default router;