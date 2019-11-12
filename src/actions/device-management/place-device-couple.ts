import { Device, Place } from '../../models';

export const FETCH_PLACE_DEVICE = 'FETCH_PLACE_DEVICE';
export const FETCH_PLACE_DEVICE_SUCCESS = 'FETCH_PLACE_DEVICE_SUCCESS';
export const FETCH_PLACE_DEVICE_FAILURE = 'FETCH_PLACE_DEVICE_FAILURE';

export interface FetchPlaceDevice {
  type: typeof FETCH_PLACE_DEVICE;
  payload: Place['id'];
}

export interface FetchPlaceDeviceSuccess {
  type: typeof FETCH_PLACE_DEVICE_SUCCESS;
  payload: {
    device: Device | null;
    placeId: Place['id'];
  };
}

export interface FetchPlaceDeviceFailure {
  type: typeof FETCH_PLACE_DEVICE_FAILURE;
  payload: string;
}

export function fetchPlaceDevice(placeId: Place['id']): FetchPlaceDevice {
  return {
    type: FETCH_PLACE_DEVICE,
    payload: placeId,
  };
}

export function fetchPlaceDeviceSuccess(
  placeId: Place['id'],
  device: Device | null,
): FetchPlaceDeviceSuccess {
  return {
    type: FETCH_PLACE_DEVICE_SUCCESS,
    payload: { device, placeId },
  };
}

export function fetchPlaceDeviceFailure(error: string): FetchPlaceDeviceFailure {
  return {
    type: FETCH_PLACE_DEVICE_FAILURE,
    payload: error,
  };
}

export type Action =
  | FetchPlaceDevice
  | FetchPlaceDeviceSuccess
  | FetchPlaceDeviceFailure;
