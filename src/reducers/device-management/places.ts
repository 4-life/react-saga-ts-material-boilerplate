import * as placeDeviceActions from '../../actions/device-management/place-device-couple';
import {
  Action as PlaceAction,
  FETCH_PLACES,
  FETCH_PLACES_SUCCESS,
  FETCH_DATA_FAILED,
} from '../../actions/dummy-data';
import { Place } from '../../models';

interface Places {
  readonly [id: string]: Place | null;
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

type Action = (
  | PlaceAction
  | placeDeviceActions.Action
);

export const reducer = (state: State = initState, action: Action): State => {
  switch (action.type) {
    case FETCH_PLACES:
    case placeDeviceActions.FETCH_PLACE_DEVICE: {
      return { ...state, fetching: true };
    }

    case FETCH_PLACES_SUCCESS: {
      return {
        ...state,
        entries: {
          ...state.entries,
          ...action.payload,
        },
        error: null,
        fetching: false,
      };
    }

    case placeDeviceActions.FETCH_PLACE_DEVICE_SUCCESS: {
      const { placeId } = action.payload;

      return {
        ...state,
        entries: {
          ...state.entries,
          [placeId]: state.entries[placeId]
            ? {
              ...state.entries[placeId],
              device_id: (
                action.payload.device &&
                action.payload.device.device_id
              ),
            }
            : null,
        },
        error: null,
        fetching: false,
      };
    }

    case FETCH_DATA_FAILED:
    case placeDeviceActions.FETCH_PLACE_DEVICE_FAILURE: {
      return {
        ...state,
        error: action.payload,
        fetching: false,
      };
    }

    default: {
      return state;
    }
  }
};

export const name = 'places';
