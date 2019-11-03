import { put, takeEvery, call } from 'redux-saga/effects';

import * as deviceActions from '../../actions/device-management/devices';
import { NotifyError } from '../../actions/notifier';
import * as api from '../../clients/client1';
import { ReasonEnum } from '../../models/apiResponse';
import { keyBy } from '../../utils/ds/array';
import { ActionWithPromise } from '../../utils/store';

export function* fetchDevicesSaga(action: deviceActions.FetchDevices) {
  const response: api.FetchDevicesResponse = yield call(api.fetchDevices, action);

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

type SearchDevicesSagaAction = (
  | ActionWithPromise<deviceActions.SearchDevices>
  | deviceActions.SearchDevices
);

function* searchDevicesSaga(action: SearchDevicesSagaAction) {
  const response: api.SearchDevicesResponse = yield call(api.searchDevices);

  if (response.reason === ReasonEnum.Ok) {
    if ('meta' in action) {
      action.meta.promise.resolve(response.data);
    }

    return;
  }

  const errorMessage = (
    'Data fetching: ' + response.message ||
    'Server error'
  );

  yield put(NotifyError(errorMessage));

  if ('meta' in action) {
    action.meta.promise.reject(new Error(errorMessage));
  }
}

export const sagas = [
  takeEvery(deviceActions.FETCH_DEVICES, fetchDevicesSaga),
  takeEvery(deviceActions.SEARCH_DEVICES, searchDevicesSaga),
];
