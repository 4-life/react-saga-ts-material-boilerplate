import { sagas as deviceSagas } from './devices';
import { sagas as placesSagas } from './places';
import { sagas as placeDeviceSagas } from './place-device-couple';

export const sagas = [
  ...deviceSagas,
  ...placesSagas,
  ...placeDeviceSagas,
];
