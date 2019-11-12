import { Device, Place } from '../../models';
import { Route } from '../typings';

// components
import { Couple, Devices, Places } from '../../pages';

const DEVICE_ID_PARAM_NAME = 'deviceId';
const PLACE_ID_PARAM_NAME = 'placeId';

export interface CoupleRouteParams {
  [DEVICE_ID_PARAM_NAME]?: string;
  [PLACE_ID_PARAM_NAME]?: string;
}

export const devicePath =
  (deviceId: Device['device_id']) => `/dm/devices/${deviceId}`;

export const placePath = (placeId: Place['id']) => `/dm/places/${placeId}`;

export const routes: Route[] = [
  {
    path: '/dm',
    label: 'Device management',
    nonLinkBreadcrumb: true,
    routes: [
      {
        path: '/dm/devices',
        label: 'Devices',
        getRouteComponent: (options) => (
          options.match.isExact
            ? Devices
            : undefined
        ),
        routes: [
          {
            path: devicePath(`:${DEVICE_ID_PARAM_NAME}`),
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
            /**
             * `placePath` normally accepts a place ID (number) in order
             * to create a meaningful URL. However, here we're going to reuse it
             * to configure the router, so string argument is nessessary,
             * which is definitely a one-time exception of the rule.
             */
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
