import { put, takeEvery, call } from 'redux-saga/effects';

import * as placesActions from '../../actions/dummy-data';
import { NotifyError } from '../../actions/notifier';
import { ApiResponse, ReasonEnum } from '../../models/apiResponse';
import { fetchPlaces } from '../../clients/client1';

export function* fetchDataApi(action: placesActions.GetPlaces) {
  const response: ApiResponse = yield call(fetchPlaces, action);

  if (response.reason === ReasonEnum.Ok) {
    yield put(placesActions.GetPlacesSuccess(response.data));
  } else {
    yield put(placesActions.GetPlacesFailed(
      response.message || 'Server error',
    ));
    yield put(NotifyError(
      'Data fetching: ' + response.message ||
      'Server error'
    ));
  }
}

export const sagas = [
  takeEvery(placesActions.FETCH_PLACES, fetchDataApi)
];
