import { ComponentType } from 'react';
import { MatchedRoute } from 'react-router-config';

import { ChildRoutesGetter, RouteComponentGetter } from './utils/rendering';

export type Route = {
  path?: string;
  label?: string;
  renderBreadcrumb?: BreadcrumbRenderer,
  icon?: string;
  main?: ComponentType;
  getRouteComponent?: RouteComponentGetter;
  exact?: boolean;
  routes?: Route[];
  getChildRoutes?: ChildRoutesGetter;
};

type BreadcrumbRenderer = (props: MatchedRoute<{}, Route>) => React.ReactNode;
