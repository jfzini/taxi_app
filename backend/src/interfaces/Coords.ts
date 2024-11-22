export interface ICoords {
  latitude: number;
  longitude: number;
}

export type RoutesOptions = {
  origin: ICoords;
  destination: ICoords;
  travelMode?: 'DRIVE' | 'WALK' | 'BICYCLE' | 'TRANSIT' | 'TWO_WHEELER';
  routingPreference?: 'TRAFFIC_UNAWARE' | 'TRAFFIC_AWARE' | 'TRAFFIC_AWARE_OPTIMAL';
};
