import * as deviceActions from '../../actions/device-management/devices';
import * as placeDeviceActions from '../../actions/device-management/place-device-couple';
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

type Action = (
  | deviceActions.Action
  | placeDeviceActions.Action
);

export const reducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case deviceActions.FETCH_DEVICES:
    case placeDeviceActions.FETCH_PLACE_DEVICE: {
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

    case placeDeviceActions.FETCH_PLACE_DEVICE_SUCCESS: {
      let entries;

      const { device } = action.payload;

      if (device) {
        entries = {
          ...state.entries,
          [device.device_id]: device,
        };
      } else {
        entries = state.entries;
      }

      return {
        ...state,
        entries,
        error: null,
        fetching: false,
      };
    }

    case deviceActions.FETCH_DEVICES_FAILURE:
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
