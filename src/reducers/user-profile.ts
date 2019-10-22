import { Action, SET_USER_DATA, UserPayload } from '../actions/user-profile';

export interface State {
  data: UserPayload;
}

const initState: State = {
  data: {
    email: 'User Email',
    role: 'user'
  }
};

export const reducer = (state: State = initState, action: Action): State => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, data: action.user };
    default:
      return { ...state };
  }
};
