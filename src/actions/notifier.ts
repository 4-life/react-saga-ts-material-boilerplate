import { Notification } from '../reducers/notifier';

export const ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR';

export type ENQUEUE_SNACKBAR = typeof ENQUEUE_SNACKBAR;
export type CLOSE_SNACKBAR = typeof CLOSE_SNACKBAR;
export type REMOVE_SNACKBAR = typeof REMOVE_SNACKBAR;

export interface EnqueueSnackbar {
  readonly type: ENQUEUE_SNACKBAR;
  notification: Notification;
}

export interface CloseSnackbar {
  readonly type: CLOSE_SNACKBAR;
  dismissAll: boolean;
  key: number;
}

export interface RemoveSnackbar {
  readonly type: REMOVE_SNACKBAR;
  key: number;
}

export const NotifyError: (message: string) => EnqueueSnackbar = (message: string) => ({
  type: ENQUEUE_SNACKBAR,
  notification: {
    message: message,
    key: new Date().getTime() + Math.random(),
    options: { variant: 'error' },
  }
});

export const NotifySuccess: (message: string) => EnqueueSnackbar = (message: string) => ({
  type: ENQUEUE_SNACKBAR,
  notification: {
    message: message,
    key: new Date().getTime() + Math.random(),
    options: { variant: 'success' },
  }
});

export const EnqueueSnackbar: (notification: Notification) => EnqueueSnackbar = (notification) => ({
  type: ENQUEUE_SNACKBAR,
  notification: {
    ...notification,
    key: new Date().getTime() + Math.random(),
  }
});

export const CloseSnackbar: (key: number) => CloseSnackbar = (key) => ({
  type: CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key,
});

export const RemoveSnackbar: (key: number) => RemoveSnackbar = (key) => ({
  type: REMOVE_SNACKBAR,
  key,
});

export type Action = EnqueueSnackbar | CloseSnackbar | RemoveSnackbar;

