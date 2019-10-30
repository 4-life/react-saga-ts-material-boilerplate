import { Device } from '../../models';
import { RootState as State } from '../../reducers';

import { name as DEVICE_MANAGEMENT_REDUCER_NAME } from '../../reducers/device-management';
import { name as DEVICES_REDUCER_NAME } from '../../reducers/device-management/devices';

function getDevicesState(state: State) {
  return state[DEVICE_MANAGEMENT_REDUCER_NAME][DEVICES_REDUCER_NAME];
}

export function areDevicesLoading(state: State) {
  const devicesState = getDevicesState(state);
  return devicesState.fetching;
}

export function getDevice(deviceId: Device['device_id'], state: State) {
  const devicesState = getDevicesState(state);
  return devicesState.entries[deviceId];
}
