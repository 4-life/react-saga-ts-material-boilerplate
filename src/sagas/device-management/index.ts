import { sagas as deviceSagas } from './devices'; 
import { sagas as placesSagas } from './places';

export const sagas = [
  ...deviceSagas,
  ...placesSagas,
];
