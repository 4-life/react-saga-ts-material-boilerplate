import {
  Action,
  FETCH_PLACES,
  FETCH_PLACES_SUCCESS
} from '../actions/dummy-data';
import { Place } from '../models';

export interface State {
  places: Place[];
  error?: string;
  isFetching?: boolean;
}

const initState: State = {
  places: []
};

export const reducer = (state: State = initState, action: Action): State => {
  switch (action.type) {
    case FETCH_PLACES:
      return { ...state, isFetching: true };
    case FETCH_PLACES_SUCCESS:
      return { ...state, places: action.payload };
    default:
      return { ...state };
  }
};
