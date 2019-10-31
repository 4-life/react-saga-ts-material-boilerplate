import { put, takeEvery, call } from 'redux-saga/effects';

import * as deviceActions from '../../actions/device-management/devices';
import { NotifyError } from '../../actions/notifier';
import { fetchDevices } from '../../clients/client1';
import { ApiResponse, ReasonEnum } from '../../models/apiResponse';

export function* fetchDevicesSaga(action: deviceActions.FetchDevices) {
  const response: ApiResponse = yield call(fetchDevices, action);

  if (response.reason === ReasonEnum.Ok) {
    yield put(deviceActions.fetchDevicesSuccess(response.data));
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
