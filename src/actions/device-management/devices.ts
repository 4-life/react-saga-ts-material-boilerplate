import { Device } from '../../models';

export const FETCH_DEVICES = 'FETCH_DEVICES';
export const FETCH_DEVICES_SUCCESS = 'FETCH_DEVICES_SUCCESS';
export const FETCH_DEVICES_FAILURE = 'FETCH_DEVICES_FAILURE';
export const SEARCH_DEVICES = 'SEARCH_DEVICES';

export interface FetchDevices {
  type: typeof FETCH_DEVICES;
  payload: Device['device_id'][];
}

export interface FetchDevicesSuccess {
  type: typeof FETCH_DEVICES_SUCCESS;
  payload: { [id: string]: Device | null };
}

export interface FetchDevicesFailure {
  type: typeof FETCH_DEVICES_FAILURE;
  payload: string;
}

export interface SearchDevices {
  type: typeof SEARCH_DEVICES;
}

export function fetchDevices(ids: Device['device_id'][]): FetchDevices {
  return {
    type: FETCH_DEVICES,
    payload: ids,
  };
}

export function fetchDevicesSuccess(
  devices: FetchDevicesSuccess['payload'],
): FetchDevicesSuccess {
  return {
    type: FETCH_DEVICES_SUCCESS,
    payload: devices,
  };
}

export function fetchDevicesFailure(error: string): FetchDevicesFailure {
  return {
    type: FETCH_DEVICES_FAILURE,
    payload: error,
  };
}

export function searchDevices(): SearchDevices {
  return { type: SEARCH_DEVICES };
}

export type Action = (
  | FetchDevices
  | FetchDevicesSuccess
  | FetchDevicesFailure
  | SearchDevices
);
