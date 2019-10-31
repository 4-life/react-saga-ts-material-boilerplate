import { Couple } from '../../pages';

const DEVICE_ID_PARAM_NAME = 'deviceId';
const PLACE_ID_PARAM_NAME = 'placeId';

export interface CoupleRouteParams {
  [DEVICE_ID_PARAM_NAME]?: string,
  [PLACE_ID_PARAM_NAME]?: string,
}

export const routes = [
  {
    path: `/dm/devices/:${DEVICE_ID_PARAM_NAME}`,
    main: Couple,
    label: 'Device page',
    routes: [],
  },
  {
    path: `/dm/places/:${PLACE_ID_PARAM_NAME}`,
    main: Couple,
    label: 'Place page',
    routes: [],
  },
];
