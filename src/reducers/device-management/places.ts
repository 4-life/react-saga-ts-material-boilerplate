import {
  Action,
  FETCH_PLACES,
  FETCH_PLACES_SUCCESS,
  FETCH_DATA_FAILED,
} from '../../actions/dummy-data';
import { Place } from '../../models';
import { keyBy } from '../../utils/ds/array';

interface Places {
  readonly [id: string]: Place,
}

export interface State {
  readonly entries: Readonly<Places>;
  readonly error: string | null;
  readonly fetching: boolean;
}

const initState: State = {
  entries: {},
  error: null,
  fetching: false,
};

export const reducer = (state: State = initState, action: Action): State => {
  switch (action.type) {
    case FETCH_PLACES: {
      return { ...state, fetching: true };
    }

    case FETCH_PLACES_SUCCESS: {
      return {
        ...state,
        entries: {
          ...state.entries,
          ...keyBy(action.payload, 'id'),
        },
        error: null,
        fetching: false,
      };
    }

    case FETCH_DATA_FAILED: {
      return {
        ...state,
        error: action.error,
        fetching: false,
      };
    }

    default: {
      return state;
    }
  }
};

export const name = 'places';
