import { put, takeEvery, call } from 'redux-saga/effects';

import {
  FETCH_PLACES,
  FETCH_PLACES_SUCCESS,
  FETCH_DATA_FAILED,
  GetPlaces,
} from '../../actions/dummy-data';

import { ApiResponse, ReasonEnum } from '../../models/apiResponse';
import { fetchPlaces } from '../../clients/client1';
import { ENQUEUE_SNACKBAR } from '../../actions/notifier';

export function* fetchDataApi(action: GetPlaces) {
  const response: ApiResponse = yield call(fetchPlaces, action);

  if (response.reason === ReasonEnum.Ok) {
    yield put({
      type: FETCH_PLACES_SUCCESS,
      payload: response.data,
    });
  } else {
    yield put({
      type: FETCH_DATA_FAILED,
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
  takeEvery(FETCH_PLACES, fetchDataApi)
];
