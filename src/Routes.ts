import {
  Couple,
  Home,
  NoMatch,
  SubPage,
  TestPage,
} from './pages';
import { ComponentType } from 'react';

interface Router {
  path?: string;
  label: string;
  icon?: string;
  main?: ComponentType;
  exact?: boolean;
}

interface SubRouter extends Router {
  routes: Router[];
}

const Routes: SubRouter[] = [
  {
    path: '/',
    exact: true,
    main: Home,
    label: 'Home',
    icon: 'home',
    routes: []
  },
  {
    path: '/page2',
    main: Home,
    label: 'Group Of Pages',
    icon: 'global',
    routes: [
      {
        path: '/page2/sub',
        label: 'SubPage',
        exact: true,
        main: SubPage,
      }
    ]
  },
  {
    path: '/test',
    label: 'Test Page',
    main: TestPage,
    routes: []
  },
  {
    path: '/couple',
    label: 'Couple',
    main: Couple,
    routes: [],
  },
  {
    main: NoMatch,
    label: 'Not found',
    routes: []
  },
];

export default Routes;
