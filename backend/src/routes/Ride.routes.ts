import { Router, type Request, type Response } from "express";

const rideRouter = Router();

rideRouter.get("/", (req: Request, res: Response) => {
	res.send("Ride route");
});

export default rideRouter;