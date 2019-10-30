import { put, takeEvery, call } from 'redux-saga/effects';

import * as deviceActions from '../../actions/device-management/devices';
import { ENQUEUE_SNACKBAR } from '../../actions/notifier';
import { fetchDevices } from '../../clients/client1';
import { ApiResponse, ReasonEnum } from '../../models/apiResponse';

export function* fetchDevicesSaga(action: deviceActions.FetchDevices) {
  const response: ApiResponse = yield call(fetchDevices, action);

  if (response.reason === ReasonEnum.Ok) {
    yield put({
      type: deviceActions.FETCH_DEVICES_SUCCESS,
      payload: response.data,
    });
  } else {
    yield put({
      type: deviceActions.FETCH_DEVICES_FAILURE,
      error: response.message || 'Server error',
    });
    yield put({
      type: ENQUEUE_SNACKBAR,
      notification: {
        message: 'Data fetching: ' + response.message || 'Server error',
        options: {
          variant: 'error'
        }
      }
    });
  }
}

export const sagas = [
  takeEvery(deviceActions.FETCH_DEVICES, fetchDevicesSaga),
];
