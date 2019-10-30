import { combineReducers } from 'redux';
import { reducer as NotifierStateReducer, State as NotifierState } from './notifier';
import * as deviceManagement from './device-management';
import { reducer as userProfileReducer, State as userProfiletState } from './user-profile';

export interface RootState {
  notifications: NotifierState;
  [deviceManagement.name]: deviceManagement.State;
  user: userProfiletState;
}

export default combineReducers<RootState>({
  notifications: NotifierStateReducer,
  [deviceManagement.name]: deviceManagement.reducer,
  user: userProfileReducer
});
