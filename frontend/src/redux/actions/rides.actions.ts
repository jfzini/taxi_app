import type { ICoords, IRide } from '../types';

const CHANGE_RIDES = 'CHANGE_RIDES';

export const changeRides = (rides: IRide[]) => ({
  type: CHANGE_RIDES,
  payload: rides,
});

export const changeCoords = (coords: ICoords) => ({
  type: 'CHANGE_COORDS',
  payload: coords,
});
