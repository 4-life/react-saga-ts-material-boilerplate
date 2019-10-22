import { ENQUEUE_SNACKBAR, CLOSE_SNACKBAR, REMOVE_SNACKBAR, Action } from '../actions/notifier';

export interface Notification {
  key: number;
  message: string;
  options?: {
    action?: object;
    key?: number;
    variant?: string;
    onClose?;
  };
}

export interface State {
  notifications: Notification[];
}

const initState: State = {
  notifications: [],
};

export const reducer = (state: State = initState, action: Action) => {
  switch (action.type) {
    case ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            key: new Date().getTime() + Math.random(),
            ...action.notification,
          },
        ],
      };

    case CLOSE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.map(notification => (
          (action.dismissAll || notification.key === action.key)
            ? { ...notification, dismissed: true }
            : { ...notification }
        )),
      };

    case REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.key !== action.key,
        ),
      };

    default:
      return state;
  }
};
