import { put, takeEvery, call } from 'redux-saga/effects';

import * as placeDeviceActions from '../../actions/device-management/place-device-couple';
import { NotifyError } from '../../actions/notifier';
import { fetchPlaceDevice, FetchPlaceDeviceResponse } from '../../clients/client1';
import { ReasonEnum } from '../../models/apiResponse';

export function* fetchPlaceDeviceSaga(action: placeDeviceActions.FetchPlaceDevice) {
  const placeId = action.payload;
  const response: FetchPlaceDeviceResponse = yield call(fetchPlaceDevice, placeId);

  if (response.reason === ReasonEnum.Ok) {
    // FIXME: disallow `response.data` to be `undefined`
    // in this case even in theory (provide stronger typings for API response)
    if (typeof response.data !== 'undefined') {
      yield put(placeDeviceActions.fetchPlaceDeviceSuccess(
        placeId,
        response.data,
      ));
    }
  } else {
    yield put(placeDeviceActions.fetchPlaceDeviceFailure(
      response.message || 'Server error'
    ));
    yield put(NotifyError(
      'Data fetching: ' + response.message ||
      'Server error'
    ));
  }
}

export const sagas = [
  takeEvery(placeDeviceActions.FETCH_PLACE_DEVICE, fetchPlaceDeviceSaga),
];
