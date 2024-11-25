export type HistoryFormData = {
  customer_id: string;
  driver_id: string;
}

export type DriverResponse = {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  rating: number;
  comment: string;
  ratePerKm: number;
  minKm: number;
  createdAt: string;
  updatedAt: string;
}

export type CustomerResponse = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export type RideHistoryResponse = {
  id: number;
  date: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
}