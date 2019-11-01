import { ComponentType } from 'react';

export type Route = {
  path?: string;
  label: string;
  icon?: string;
  main?: ComponentType;
  exact?: boolean;
  routes?: Route[];
};
