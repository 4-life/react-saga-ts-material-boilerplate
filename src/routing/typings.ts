import { ComponentType } from 'react';
import { MatchedRoute } from 'react-router-config';

export type Route = {
  path?: string;
  label?: string;
  renderBreadcrumb?: BreadcrumbRenderer,
  icon?: string;
  main?: ComponentType;
  exact?: boolean;
  routes?: Route[];
};

type BreadcrumbRenderer = (props: MatchedRoute<{}, Route>) => React.ReactNode;
