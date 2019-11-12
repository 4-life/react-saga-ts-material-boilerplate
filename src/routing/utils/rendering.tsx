import React from 'react';
import { RouteConfig, RouteConfigComponentProps } from 'react-router-config';

// components
import { Switch, SwitchProps, Route } from 'react-router-dom';

export type ChildRoutesGetter = (route: RouteConfig) => RouteConfig['routes'];

type RouteComponentGetterOptions =
  RouteConfigComponentProps &
  { route: RouteConfig };

export type RouteComponentGetter =
  (options: RouteComponentGetterOptions) =>
  RouteConfig['component'];

type Options = {
  extraProps?: any;
  getChildRoutes?: ChildRoutesGetter;
  getRouteComponent?: RouteComponentGetter;
  routes: RouteConfig[] | undefined;
  switchProps?: SwitchProps;
};

const getChildRoutesDefault: ChildRoutesGetter = (route) => {
  return route.routes;
};

const getRouteComponentDefault: RouteComponentGetter = (options) => {
  return options.route.component;
};

/**
 * It's similar to `react-router-config`'s `renderRoutes()` with a few differences:
 * - if `route.render` and route component are falsy, it renders the routes **recursively**
 * - it receives an options object instead of unnamed arguments list
 * - it supports an optional `options.getRouteComponent` to configure the route component property
 * - it supports an optional `options.getChildRoutes` to configure the child routes
 * (defaults to `route.component`)
 */
export function renderRoutes(options: Options) {
  if (!options.routes) {
    return null;
  }

  return (
    <Switch {...options.switchProps}>
      {options.routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={(props) => {
            if (route.render) {
              return route.render({
                ...props,
                ...options.extraProps,
                route: route,
              });
            }

            const getRouteComponent = (
              options.getRouteComponent ||
              getRouteComponentDefault
            );

            const Component = getRouteComponent({ route, ...props });

            if (Component) {
              return (
                <Component
                  {...props}
                  {...options.extraProps}
                  route={route}
                />
              );
            }

            const getChildRoutes = (
              options.getChildRoutes ||
              getChildRoutesDefault
            );

            const childRoutes = getChildRoutes(route);

            return renderRoutes({
              ...options,
              routes: childRoutes,
            });
          }}
        />
      ))}
    </Switch>
  );
}

export default renderRoutes;
