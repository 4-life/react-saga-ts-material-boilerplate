import { combineReducers } from 'redux';

import * as devices from './devices';
import * as places from './places';

export interface State {
  [devices.name]: devices.State;
  [places.name]: places.State;
}

export const name = 'deviceManagement';

export const reducer = combineReducers<State>({
  [devices.name]: devices.reducer,
  [places.name]: places.reducer,
});
