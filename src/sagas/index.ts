import { all } from 'redux-saga/effects';

import { sagas as deviceManagementSagas } from './device-management';

export default function* rootSaga() {
  yield all([
    ...deviceManagementSagas
  ]);
}
