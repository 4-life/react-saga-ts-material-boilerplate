import { AnyAction, Dispatch } from 'redux';

type PromiseResolverMeta = {
  promise: {
    resolve: Function;
    reject: Function;
  };
};

export type ActionWithPromise<Action> = Action & {
  meta: Action extends Record<'meta', {}>
    ? Action['meta'] & PromiseResolverMeta
    : PromiseResolverMeta;
};

export function createAsyncDispatch(dispatch: Dispatch) {
  function dispatchAsync<
    Action extends AnyAction,
    Result
  >(action: Action): Promise<Result> {
    return new Promise((resolve, reject) => {
      const nextAction: ActionWithPromise<Action> = {
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
