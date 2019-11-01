import { Route } from '../typings';

// components
import { Couple } from '../../pages';

const DEVICE_ID_PARAM_NAME = 'deviceId';
const PLACE_ID_PARAM_NAME = 'placeId';

export interface CoupleRouteParams {
  [DEVICE_ID_PARAM_NAME]?: string,
  [PLACE_ID_PARAM_NAME]?: string,
}

export const routes: Route[] = [
  {
    path: '/dm',
    label: 'Device management',
    routes: [
      {
        path: '/dm/devices',
        label: 'Devices',
        routes: [
          {
            path: `/dm/devices/:${DEVICE_ID_PARAM_NAME}`,
            main: Couple,
            renderBreadcrumb({ match }) {
              return match.params[DEVICE_ID_PARAM_NAME];
            },
            routes: [],
          },
        ],
      },
      {
        path: '/dm/places',
        label: 'Places',
        routes: [
          {
            path: `/dm/places/:${PLACE_ID_PARAM_NAME}`,
            main: Couple,
            renderBreadcrumb({ match }) {
              return match.params[PLACE_ID_PARAM_NAME];
            },
            routes: [],
          },
        ],
      },
    ],
  },
];
