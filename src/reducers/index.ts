import { combineReducers } from 'redux';
import { reducer as NotifierStateReducer, State as NotifierState } from './notifier';
import { reducer as deviceManagementReducer, State as deviceManagementState } from './device-management';
import { reducer as userProfileReducer, State as userProfiletState } from './user-profile';

export interface RootState {
  notifications: NotifierState;
  deviceManagement: deviceManagementState;
  user: userProfiletState;
}

export default combineReducers({
  notifications: NotifierStateReducer,
  deviceManagement: deviceManagementReducer,
  user: userProfileReducer
});
