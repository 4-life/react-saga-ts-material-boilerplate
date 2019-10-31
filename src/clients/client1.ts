import { FetchDevices } from '../actions/device-management/devices';
import { ApiResponse, Device, Place } from '../models';
import { GetPlaces } from '../actions/dummy-data';

const isProd = process.env.REACT_APP_STAGE === 'production';

const urls = {
  ...(isProd ? {
    findPlaces: 'https://api.prod',
    findDevices: 'https://api.prod'
  } : {
    findPlaces: 'https://yzcgo.sse.codesandbox.io/places',
    findDevices: 'https://yzcgo.sse.codesandbox.io/devices'
  })
};

export type FetchDevicesResponse = ApiResponse<Array<Device>>;

export const fetchDevices = (action: FetchDevices): Promise<FetchDevicesResponse> => {
  return fetch(urls.findDevices)
    .catch((err) => err);
};

export type FetchPlacesResponse = ApiResponse<Array<Place>>;

export const fetchPlaces = (action: GetPlaces): Promise<FetchPlacesResponse> => {
  return fetch(urls.findPlaces)
    .catch((err) => err);
};
