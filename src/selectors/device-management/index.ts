import { RootState as State } from '../../reducers';
import { areDevicesLoading } from './devices';
import { arePlacesLoading } from './places';

export function isFetching(state: State) {
  return areDevicesLoading(state) || arePlacesLoading(state);
}
