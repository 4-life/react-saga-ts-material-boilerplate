import test from 'tape';

import { put, call, delay } from 'redux-saga/effects';
import { incrementAsync } from './counter-sagas';

test('incrementAsync Saga test', (t) => {
  const generator = incrementAsync();

  t.deepEqual(
    generator.next().value,
    call(delay, 1000),
    'counter Saga must call delay(1000)',
  );

  t.deepEqual(
    generator.next().value,
    put({ type: 'INCREMENT' }),
    'counter Saga must dispatch an INCREMENT action',
  );

  t.deepEqual(
    generator.next(),
    { done: true, value: undefined },
    'counter Saga must be done',
  );

  t.end();
});
