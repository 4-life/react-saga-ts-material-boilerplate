import {
  Action,
  FETCH_PLACES,
  FETCH_PLACES_SUCCESS
} from '../../actions/dummy-data';
import { Place } from '../../models';

export interface State {
  readonly entries: ReadonlyArray<Place>;
  readonly error: string | null;
  readonly fetching: boolean;
}

const initState: State = {
  entries: [],
  error: null,
  fetching: false,
};

export const reducer = (state: State = initState, action: Action): State => {
  switch (action.type) {
    case FETCH_PLACES:
      return { ...state, fetching: true };
    case FETCH_PLACES_SUCCESS:
      return { ...state, entries: action.payload };
    default:
      return { ...state };
  }
};

export const name = 'places';
