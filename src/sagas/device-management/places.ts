import { put, takeEvery, call } from 'redux-saga/effects';

import * as placesActions from '../../actions/dummy-data';
import { NotifyError } from '../../actions/notifier';
import { ReasonEnum } from '../../models/apiResponse';
import { fetchPlaces, FetchPlacesResponse } from '../../clients/client1';

export function* fetchDataApi(action: placesActions.GetPlaces) {
  const response: FetchPlacesResponse = yield call(fetchPlaces, action);

  if (response.reason === ReasonEnum.Ok) {
    if (response.data) {
      yield put(placesActions.GetPlacesSuccess(response.data));
    }
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
