export const SET_USER_DATA = 'SET_USER_DATA';

type SET_USER_DATA = typeof SET_USER_DATA;

export interface UserPayload {
  [key: string]: string;
}

interface DoSetUserData {
  readonly type: SET_USER_DATA;
  user: UserPayload;
}

export const DoSetUserData: (user: UserPayload) => DoSetUserData = (user) => ({
  type: SET_USER_DATA,
  user
});

export type Action = DoSetUserData;
