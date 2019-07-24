export const INCREMENT = 'INCREMENT';
export const INCREMENT_ASYNC = 'INCREMENT_ASYNC';
export const DECREMENT = 'DECREMENT';

export type INCREMENT = typeof INCREMENT;
export type INCREMENT_ASYNC = typeof INCREMENT_ASYNC;
export type DECREMENT = typeof DECREMENT;

export interface Increment {
  readonly type: INCREMENT;
}

export interface IncrementAsync {
  readonly type: INCREMENT_ASYNC;
}

export interface Decrement {
  readonly type: DECREMENT;
}

export type Action = Increment | Decrement | IncrementAsync;

export const DoIncrement: () => Increment = () => ({
  type: INCREMENT,
});

export const DoDecrement: () => Decrement = () => ({
  type: DECREMENT,
});
export const DoIncrementAsync: () => IncrementAsync = () => ({
  type: INCREMENT_ASYNC,
});

export interface State {
  number: number;
}

export function counter(number: number = 0, action: Action): number {
  switch (action.type) {
    case INCREMENT:
      return number + 1;
    case DECREMENT:
      return number - 1;
    default:
      return number;
  }
}
