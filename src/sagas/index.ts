import { all } from 'redux-saga/effects';

import { dummyDataSagas } from './device-management';

export default function* rootSaga() {
  yield all([
    ...dummyDataSagas
  ]);
}
