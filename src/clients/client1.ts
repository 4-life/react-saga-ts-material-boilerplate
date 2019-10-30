import { FetchDevices } from '../actions/device-management/devices';
import { ApiResponse } from '../models';
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

export const fetchDevices = (action: FetchDevices): Promise<ApiResponse> => {
  return fetch(urls.findDevices)
    .catch((err) => err);
};

export const fetchPlaces = (action: GetPlaces): Promise<ApiResponse> => {
  return fetch(urls.findDevices)
    .catch((err) => err);
};
