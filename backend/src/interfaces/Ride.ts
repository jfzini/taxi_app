export interface IRide {
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  value: number;
  customerId: string;
  driverId: number;
}

export interface IDriver {
  id: number;
  name: string;
}

export interface IConfirmRideParams {
  customerId: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: IDriver;
  value: number;
}
