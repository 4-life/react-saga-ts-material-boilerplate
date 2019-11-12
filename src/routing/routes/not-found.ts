import { Route } from '../typings';

// components
import { NoMatch } from '../../pages';

export const routes: Route[] = [
  {
    main: NoMatch,
    label: 'Not found',
    routes: []
  }
];
