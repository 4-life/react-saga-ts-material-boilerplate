import {
  Home,
  SubPage,
  TestPage,
} from './pages';
import { routes as deviceManagementRoutes } from './routing/routes/device-management';
import { routes as notFoundRoutes } from './routing/routes/not-found';

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
  ...deviceManagementRoutes,
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
  ...notFoundRoutes,
];

export default Routes;
