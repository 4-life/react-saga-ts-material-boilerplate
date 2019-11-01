import { put, takeEvery, call } from 'redux-saga/effects';

import * as placesActions from '../../actions/dummy-data';
import { NotifyError } from '../../actions/notifier';
import { ReasonEnum } from '../../models/apiResponse';
import { fetchPlaces, FetchPlacesResponse } from '../../clients/client1';
import { keyBy } from '../../utils/ds/array';

export function* fetchDataApi(action: placesActions.GetPlaces) {
  const response: FetchPlacesResponse = yield call(fetchPlaces, action);

  if (response.reason === ReasonEnum.Ok) {
    const receivedPlaces = response.data
      ? keyBy(response.data, 'id')
      : {};

    const requestedPlaceEntries = action.ids.map(
      (placeId) => [
        placeId,
        receivedPlaces[placeId] || null,
      ],
    );

    yield put(placesActions.GetPlacesSuccess(
      Object.fromEntries(requestedPlaceEntries),
    ));
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
