import { combineReducers } from 'redux';

import * as places from './places';

export interface State {
  [places.name]: places.State,
}

export const name = 'deviceManagement';

export const reducer = combineReducers({
  [places.name]: places.reducer,
});
