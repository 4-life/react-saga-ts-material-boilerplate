import { Place } from '../../models';
import { Route } from '../typings';

// components
import { Couple, Places } from '../../pages';

const DEVICE_ID_PARAM_NAME = 'deviceId';
const PLACE_ID_PARAM_NAME = 'placeId';

export interface CoupleRouteParams {
  [DEVICE_ID_PARAM_NAME]?: string,
  [PLACE_ID_PARAM_NAME]?: string,
}

export const placePath = (placeId: Place['id']) => `/dm/places/${placeId}`;

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
        getRouteComponent: (options) => options.match.isExact ? Places : undefined,
        routes: [
          {
            path: placePath(`:${PLACE_ID_PARAM_NAME}` as any),
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
