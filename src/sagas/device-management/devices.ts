import { put, takeEvery, call } from 'redux-saga/effects';

import * as deviceActions from '../../actions/device-management/devices';
import { NotifyError } from '../../actions/notifier';
import { fetchDevices, FetchDevicesResponse } from '../../clients/client1';
import { ReasonEnum } from '../../models/apiResponse';
import { keyBy } from '../../utils/ds/array';

export function* fetchDevicesSaga(action: deviceActions.FetchDevices) {
  const response: FetchDevicesResponse = yield call(fetchDevices, action);

  if (response.reason === ReasonEnum.Ok) {
    const receivedDevices = response.data
      ? keyBy(response.data, 'device_id')
      : {};

    const requestedDeviceEntries = action.payload.map(
      (deviceId) => [
        deviceId,
        receivedDevices[deviceId] || null,
      ],
    );

    yield put(deviceActions.fetchDevicesSuccess(
      Object.fromEntries(requestedDeviceEntries),
    ));
  } else {
    yield put(deviceActions.fetchDevicesFailure(
      response.message || 'Server error'
    ));
    yield put(NotifyError(
      'Data fetching: ' + response.message ||
      'Server error'
    ));
  }
}

export const sagas = [
  takeEvery(deviceActions.FETCH_DEVICES, fetchDevicesSaga),
];
