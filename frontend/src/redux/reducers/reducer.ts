import { combineReducers } from '@reduxjs/toolkit';
import ridesReducer from './rides.reducer';

const reducers = combineReducers({
  rides: ridesReducer,
});

export default reducers;
