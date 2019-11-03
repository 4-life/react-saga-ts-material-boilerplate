import { AnyAction, Dispatch, Action } from 'redux';

interface ActionWithMeta<Meta = any> extends Action {
  meta: Meta
}

type PromiseResolverMeta = {
  promise: {
    resolve: Function,
    reject: Function,
  },
};

export type ActionWithPromise<A = AnyAction> = A & {
  meta: A extends ActionWithMeta
    ? A['meta'] & PromiseResolverMeta
    : PromiseResolverMeta
};

export function createAsyncDispatch(dispatch: Dispatch) {
  function dispatchAsync<A extends AnyAction, T = any>(action: A): Promise<T> {
    return new Promise((resolve, reject) => {
      const nextAction: ActionWithPromise<A> = {
        ...action,
        meta: {
          ...action.meta,
          promise: { resolve, reject },
        },
      };

      dispatch(nextAction);
    });
  }

  return dispatchAsync;
}

export function dispatchWithPromise(dispatch: Dispatch, action: AnyAction) {
  return new Promise((resolve, reject) => {
    dispatch({
      ...action,
      meta: {
        ...action.meta,
        promise: { resolve, reject },
      },
    });
  });
}
