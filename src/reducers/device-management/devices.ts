import * as deviceActions from '../../actions/device-management/devices';
import { Device } from '../../models';
import { keyBy } from '../../utils/ds/array';

export const name = 'devices';

interface Devices {
  readonly [deviceId: string]: Device,
}

export interface State {
  readonly entries: Readonly<Devices>,
  readonly error: string | null,
  readonly fetching: boolean,
}

const initialState: State = {
  entries: {},
  error: null,
  fetching: false,
};

export const reducer = (
  state: State = initialState,
  action: deviceActions.Action,
): State => {
  switch (action.type) {
    case deviceActions.FETCH_DEVICES: {
      return { ...state, fetching: true };
    }

    case deviceActions.FETCH_DEVICES_SUCCESS: {
      return {
        ...state,
        entries: {
          ...state.entries,
          ...keyBy(action.payload, 'device_id'),
        },
        error: null,
        fetching: false,
      };
    }

    case deviceActions.FETCH_DEVICES_FAILURE: {
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
