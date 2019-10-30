import { RootState as State } from '../../reducers';
import { arePlacesLoading } from './places';

export function isFetching(state: State) {
  return arePlacesLoading(state);
}
