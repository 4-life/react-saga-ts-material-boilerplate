import { put, takeEvery, delay, all } from 'redux-saga/effects';

import { INCREMENT, INCREMENT_ASYNC } from '../reducers/counter';

export function* helloSaga() {
  console.log('Hello Saga!');
}

export function* incrementAsync() {
  yield delay(1000);
  yield put({type: INCREMENT});
}

export function* watchIncrementAsync() {
  yield takeEvery(INCREMENT_ASYNC, incrementAsync);
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync(),
  ]);
}
