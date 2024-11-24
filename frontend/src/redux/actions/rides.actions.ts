import type { ICoords, IRide } from '../types';

const CHANGE_RIDES = 'CHANGE_RIDES';
const CHANGE_COORDS = 'CHANGE_COORDS';
const CHANGE_DISTANCE = 'CHANGE_DISTANCE';
const CHANGE_DURATION = 'CHANGE_DURATION';

export const changeRides = (rides: IRide[]) => ({
  type: CHANGE_RIDES,
  payload: rides,
});

export const changeCoords = (coords: ICoords) => ({
  type: CHANGE_COORDS,
  payload: coords,
});

export const changeDistance = (distance: number) => ({
  type: CHANGE_DISTANCE,
  payload: distance,
});

export const changeDuration = (duration: string) => ({
  type: CHANGE_DURATION,
  payload: duration,
});
