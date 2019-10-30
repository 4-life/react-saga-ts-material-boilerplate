import { Place } from '../../models';
import { RootState as State } from '../../reducers';

import { name as DEVICE_MANAGEMENT_REDUCER_NAME } from '../../reducers/device-management';
import { name as PLACES_REDUCER_NAME } from '../../reducers/device-management/places';

function getPlacesState(state: State) {
  return state[DEVICE_MANAGEMENT_REDUCER_NAME][PLACES_REDUCER_NAME];
}

export function arePlacesLoading(state: State) {
  const placesState = getPlacesState(state);
  return placesState.fetching;
}

export function getPlace(placeId: Place['id'], state: State) {
  const placesState = getPlacesState(state);
  return placesState.entries[placeId];
}
