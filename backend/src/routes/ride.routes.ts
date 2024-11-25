import { Router, type Request, type Response } from 'express';
import {estimateMiddleware, listRidesMiddleware} from '../middlewares/estimate.middleware';
import rideController from '../controllers/ride.controller';

const rideRouter = Router();

rideRouter.get('/customers', rideController.listCustomers);
rideRouter.get('/drivers', rideController.listDrivers);
rideRouter.post('/estimate', estimateMiddleware, rideController.estimateRoute);
rideRouter.patch('/confirm', estimateMiddleware, rideController.confirmRide);
rideRouter.get('/:customer_id?', listRidesMiddleware, rideController.listCustomerRides);

export default rideRouter;
