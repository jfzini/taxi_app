import rideRouter from './ride.routes';
import { Router } from 'express';

const router = Router();

router.use('/ride', rideRouter);

export default router;
