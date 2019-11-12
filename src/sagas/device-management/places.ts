import { put, takeEvery, call } from 'redux-saga/effects';

import * as placesActions from '../../actions/dummy-data';
import { NotifyError } from '../../actions/notifier';
import { ReasonEnum } from '../../models/apiResponse';
import * as api from '../../clients/client1';
import { keyBy } from '../../utils/ds/array';
import { ActionWithPromise } from '../../utils/store';

export function* fetchDataApi(action: placesActions.GetPlaces) {
  const response: api.FetchPlacesResponse = yield call(api.fetchPlaces, action);

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

type SearchPlacesSagaAction =
  | ActionWithPromise<placesActions.SearchPlaces>
  | placesActions.SearchPlaces

function* searchPlacesSaga(action: SearchPlacesSagaAction) {
  const response: api.SearchPlacesResponse = yield call(api.searchPlaces);

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
  takeEvery(placesActions.FETCH_PLACES, fetchDataApi),
  takeEvery(placesActions.SEARCH_PLACES, searchPlacesSaga),
];
